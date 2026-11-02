# EVChargeData : tranches tarifaires (Base, HP/HC, Tempo, …)

Date : 2026-11-02. Complète `2026-10-26-charge-board-stats-vehicles-target-design.md` (onglet Statistiques).

## Intention

Baptiste est en contrat **Tempo** : 6 prix (jours bleu, blanc, rouge × HC, HP). Le coût est déjà juste, parce qu'il vient du capteur de tarif du moment (`sensor.tarif_actuel_tempo_6kva_ttc`). Mais les statistiques ne montrent que HC / HP, et on ne voit pas ce qu'a coûté une charge un jour rouge.

Il veut voir, dans les barres « coût par mois » de l'onglet Statistiques, la part de chaque tranche, avec les couleurs de son dashboard énergie.

Le mécanisme doit marcher **pour tous les contrats** : Base (1 prix), HP/HC (2), Tempo (6), et tout autre contrat à « type de jour » (Zen Flex, EJP…), sans code propre à Tempo dans le calcul.

Succès :
- ouvrir Statistiques et voir, mois par mois, les tranches bleu HC / bleu HP / blanc HC / blanc HP / rouge HC / rouge HP, dans les couleurs du dashboard énergie ;
- une installation en Base ou en HP/HC garde un affichage juste (1 ou 2 tranches), sans rien configurer de plus.

## Ce qui est décidé (par Baptiste)

- Une **tranche** = (type de jour, HC/HP). Chaque axe est optionnel :

  | Contrat | Source HC | Type de jour | Tranches |
  |---|---|---|---|
  | Base | aucune | aucun | 1 |
  | HP/HC | capteur ou plages | aucun | 2 |
  | Tempo | capteur | entité couleur (3 valeurs) | 6 |
  | Autre | selon config | selon config | n × 2 |

- **Type de jour** : nouvelle option facultative de l'intégration, une entité dont l'état est le type de jour courant. Chez Baptiste : `sensor.rte_tempo_couleur_actuelle` (états `Bleu`, `Blanc`, `Rouge`). Elle bascule à 6 h, donc une charge de nuit tombe sur la couleur du jour Tempo commencé la veille, sans calcul.
- Le **coût** reste celui du capteur de tarif au moment de la charge. On ne déduit **jamais** la tranche du prix (les prix changent deux fois par an).
- **Couleurs** (celles du thème de Baptiste, codées en dur pour les valeurs reconnues) :

  | Jour | HC | HP |
  |---|---|---|
  | Bleu | `#88c2e3` | `#1999e2` |
  | Blanc | `#8f8f8f` | `#e0e0e0` |
  | Rouge | `#e38888` | `#e42323` |

  Valeurs reconnues sans tenir compte de la casse : `bleu`/`blue`, `blanc`/`white`, `rouge`/`red` (les deux intégrations Tempo courantes).
- On **ne lit pas** les variables `--energy-grid-consumption-color-N` du thème : leur numéro suit l'ordre des sources d'énergie de chaque installation, il n'a pas de sens pour une autre.
- **Sessions passées** : l'action `charge_board.rebuild_history` remplit le type de jour depuis l'historique HA (10 jours). Pour les sessions plus anciennes, un paramètre facultatif de cette action, **type de jour par défaut** (ici `Bleu`), leur affecte ce type ; leurs parts HC/HP existantes deviennent les tranches de ce jour. Chez Baptiste, c'est exact : 0 jour blanc et 0 rouge placés depuis le 1er septembre. On n'ajoute pas d'option calendrier.

## Non-objectifs

- Pas de prix par tranche saisi dans EVChargeData : le prix vient toujours du capteur de tarif ou des prix fixes existants.
- Pas de tranches dans la liste des sessions ni sur la courbe de puissance d'une session (mon choix, Baptiste n'en a pas parlé ; à ajouter plus tard si le besoin vient).
- Pas de détection automatique du contrat.

## Anti-objectifs

- Un utilisateur en Base ou HP/HC ne doit voir ni tranche vide, ni légende Tempo, ni option obligatoire nouvelle.
- Des sessions déjà enregistrées ne doivent ni perdre leur coût ni changer de total.

## Comportement attendu

### Enregistrement
- Chaque lecture (`Sample`) porte le type de jour (état de l'entité, `None` si absente / indisponible).
- La session cumule kWh et coût **par tranche**, comme elle le fait déjà pour `off_peak` / `peak` et `by_price`. `off_peak` / `peak` restent tels quels (totaux HC / HP, utilisés ailleurs).
- Type de jour inconnu pendant une partie de la charge : cette part va dans une tranche sans type de jour (comme aujourd'hui).
- Fusion et découpe de sessions conservent les tranches (même logique que `off_peak` / `peak` ; pour la découpe, le type de jour peut être noté par point de courbe comme `off_peak`).

### Statistiques
- Chaque ligne de mois expose le coût (et les kWh) par tranche.
- Barres « coût par mois » : empilées par tranche, ordre fixe de bas en haut : bleu HC, bleu HP, blanc HC, blanc HP, rouge HC, rouge HP, puis les types inconnus, puis la tranche sans type de jour.
- Légende : seulement les tranches présentes sur la période affichée.
- Sans type de jour configuré : affichage actuel inchangé (HC en `--info-color`, HP en `--warning-color`) ; en Base (ni HC ni type de jour), une seule couleur.
- Type de jour non reconnu (ex. Zen Flex) : une teinte par type, foncée pour HP et claire pour HC (teintes au choix du développeur, lisibles en clair et en sombre).

### Reconstruction
- `rebuild_history` lit l'historique de l'entité type de jour comme celui des autres entités.
- Paramètre facultatif `default_day_type` : appliqué uniquement aux sessions **sans aucune tranche à type de jour** ; convertit leurs parts HC/HP en tranches de ce type. Sans ce paramètre, rien ne change pour elles.

## Précisions (choix de Claude, après relecture ; à corriger par Baptiste si besoin)

1. **Clé de tranche** = (type de jour ou aucun, `hc` / `hp` / aucun). L'axe HC/HP est « aucun » quand la source HC n'est pas connue. Les totaux `off_peak` / `peak` existants gardent leur règle actuelle (inconnu → `peak`), rien ne change pour eux.
2. **Option globale** (dans les options de l'intégration, comme le capteur de tarif et le capteur HC), pas par chargeur ni par véhicule.
3. **Le panneau déduit l'affichage des données** : il reçoit les tranches dans les lignes mensuelles (websocket des statistiques) et affiche celles présentes. Pas de champ « type de jour configuré » à envoyer.
4. **Sessions déjà enregistrées dans les 10 jours d'historique** : `rebuild_history` les complète en place (comme `enrich` le fait pour les km), sans toucher à leur énergie ni à leur coût total. La répartition se fait sur la courbe : énergie de chaque point, type de jour lu dans l'historique à l'heure du point, et HC/HP du point. Les sessions `edited` sont complétées aussi : on ajoute seulement une étiquette, les totaux ne bougent pas.
5. **`default_day_type`** ne touche que les sessions qui n'ont toujours aucune tranche à type de jour **après** cette étape, c'est-à-dire celles hors de l'historique ou celles dont l'entité était indisponible. Il est idempotent : une session qui a déjà un type de jour n'est plus modifiée. On le documente dans la description de l'action.
6. **Découpe** : chaque point de courbe porte désormais son type de jour (champ facultatif, absent des anciennes sessions). La découpe répartit les tranches selon la courbe. Sans type de jour par point (anciennes sessions), elle répartit au prorata de l'énergie, dans chaque part HC/HP.
7. **Fusion** : on additionne les tranches clé par clé, et `has_off_peak_source` garde sa règle actuelle.
8. **Types de jour non reconnus** : ordre alphabétique après bleu, blanc, rouge. Leur couleur est dérivée du nom (hachage), donc stable d'un mois et d'une session à l'autre.
9. **Barres de coût** : seuls les kWh tarifés comptent, comme aujourd'hui. La somme des tranches d'un mois est égale à son coût.

## Laissé au développeur

- Format de stockage des tranches dans `Session` (clé composée ou structure imbriquée), en restant lisible par `from_dict` pour les sessions anciennes (sans le champ).
- Nom et libellés de l'option (FR/EN), texte de la légende.
- Teintes générées pour les types de jour inconnus.
- Tests : tranche par lecture, fusion/découpe, statistiques mensuelles, Base / HP-HC / Tempo, reconstruction avec et sans `default_day_type`, légende du panneau.
