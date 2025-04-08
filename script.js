// --- Global State ---
let currentCategory = null;
let currentItems = []; // Holds the data (including descriptionHtml) for the current category
let currentItemIndex = 0;
let carouselTrack = null; // Reference to the carousel track element
let cardElements = []; // Array of actual card DOM elements
let fogElement = null;
let youtubePlayer = null; // Variable to hold the YouTube player instance
let isMusicPlaying = false; // Track music state

const ASSET_BASE_PATH = 'New Assets'; // Update path for deployment

// --- Asset Manifest (Rename Objects->Artifacts) ---
const assets = {
    Factions: [
        {
            name: "Passion Hunters",
            subtitle: "Damaged & Driven",
            img: "Passion_Hunters.png",
            quote: "Every scar is a testament to my resolve.",
            flavorLine: "Their rage is unrelenting. Their wounds never heal. They are drawn to a war they may never truly win.",
            descriptionHtml: `<p class="intro-quote">"Every scar is a testament to my resolve."</p><h4>Lore & Backstory</h4><p>Passion Hunters are not an organization, a movement, or a secret society. They are individuals, isolated and alone, bound only by personal loss. Each has suffered an encounter with a vampire that shattered their lives, leaving behind nothing but grief and a desperate need for answers. Some seek revenge, others justice, and a rare few fight simply to ensure no one else endures what they have.</p><h4>Methods & Training</h4><p>They teach themselves through necessity, scavenging knowledge from obscure books, whispered rumors, or sheer trial and error. Some fashion crude weapons, others steal from crime scenes or black-market suppliers. A few turn to old folklore, trusting in tactics passed down by frightened ancestors.</p><p>Their methods are erratic. One might spend years tracking a single vampire, obsessively collecting evidence, while another lashes out in blind rage, burning down a suspected lair without certainty of its inhabitants.</p><h4>Society & Culture</h4><p>Passion Hunters rarely cross paths. When they do, it is almost always by chance. A brief exchange of warnings, a tense truce in a dark alley, or an uneasy alliance that lasts just long enough to take down a shared enemy. They do not form networks, nor do they follow any set of unwritten rules. Each operates according to their personal motivations and their own interpretation of what must be done.</p><h4>Limitations & Perspective</h4><p>Most Passion Hunters don\'t realize the scale of what they\'re fighting. They think their enemy is singular, a monster in the night. A simple creature that stole their life, not part of an ancient tangled web stretching across centuries. They do not see the bigger picture, and most wouldn\'t understand it if they did.</p><h4>The Ones Who Live</h4><p>Most Passion Hunters burn out or succumb to the challenge they set for themselves—too reckless and too broken to last. But a few survive, adapt, and overcome. They move like shadows, hunting with an efficiency that even elder vampires respect. These few are whispered about in fear. Less predictable than the organized militias of The Blackened Order, but every bit as dangerous.</p><h4>The Hunt Never Ends</h4><p>For a Passion Hunter, there is no "after." Even if their revenge is complete, even if they destroy the creature that ruined them, the emptiness remains. Some turn to hunting all vampires. Others simply vanish, unable to return to a normal life. A few, it is said, go too far, becoming monsters themselves.</p><p class="flavor-line">Their rage is unrelenting. Their wounds never heal. They are drawn to a war they may never truly win.</p>`
        },
        {
            name: "The Grotesque",
            subtitle: "Damned Outcasts",
            img: "The Grotesque.png",
            quote: "We chose the path of mercy, and for that, we have been forsaken.",
            flavorLine: "Not welcome among the living nor accepted by the damned, they remain in an abyss of their own making.",
            descriptionHtml: `<p class="intro-quote">"We chose the path of mercy, and for that, we have been forsaken."</p><h4>Lore & Backstory</h4><p>Not a true bloodline, the Grotesque are the byproduct of vampires who refuse to drink human blood. Over time, their bodies warp, their humanity slipping away as they descend into monstrous forms. Their origins are steeped in sorrow. Once dignified beings, they sacrificed their noble appetites in a desperate bid for redemption or moral purity, only to find that nature would not be denied its due.</p><h4>Feeding Habits</h4><p>They sustain themselves on animal blood but are cursed with extreme hunger. The scent of human blood drives them to the edge of insanity, a constant reminder of what they have renounced and what they crave.</p><h4>Reproduction</h4><p>There is no deliberate siring among the Grotesque. Instead, any vampire who completely forsakes human blood over time inevitably mutates into a Grotesque. Their numbers swell slowly as more of their kind choose or are forced into this path of self-imposed exile.</p><h4>Weaknesses</h4><ul><li><strong>Irreversible Mutation:</strong> Once a vampire turns, they can never return to their previous state.</li><li><strong>Sunlight Sensitivity:</strong> They burn to ash almost instantly in the sun.</li><li><strong>Inner Conflict:</strong> The perpetual battle between their lingering human empathy and monstrous instincts often leaves them vulnerable to self-destruction.</li></ul><h4>Abilities</h4><ul><li><strong>Gargoyle Physique:</strong> Their skin hardens, and many develop monstrous features—clawed hands, taloned feet, and a nightmarish visage.</li><li><strong>Regenerative Prowess:</strong> They can endure extreme wounds, regenerating rapidly when well-fed on animal blood.</li><li><strong>Enhanced Climbing:</strong> Their claws and unnatural strength allow them to scale sheer surfaces, moving unseen along urban landscapes.</li></ul><h4>Society & Culture</h4><p>They tend to live on the fringes of society, forming hidden enclaves in abandoned buildings, underground sewers, or ancient ruins. Within these shadowed communities, debates rage over whether to search for a lost cure to reclaim their lost humanity or to embrace their monstrous destiny as a symbol of defiant honor.</p><h4>Appearance & Distinctions</h4><p>Their bodies bear the marks of their curse—hunched postures, rough, scaled skin, and eyes that burn with a wild, animalistic gleam. They are often shunned by other bloodlines and seen as living pariahs.</p><h4>The Hollow Hunger</h4><p>For the Grotesque, the hunger is more than a physical torment. It is a haunting presence, a cruel voice in their minds. Some claim that in the dead of night, they hear it whispering their names, urging them to heed the call.</p><h4>The Question of Redemption</h4><p>Rumors circulate among their kind of a cure. A way to halt their slow descent into monstrosity. Some say that drinking from a holy relic could restore them. Others believe that the transformation is irreversible and those who seek salvation are only prolonging their suffering.</p><p class="flavor-line">Not welcome among the living nor accepted by the damned, they remain in an abyss of their own making.</p>`
        },
        {
            name: "The Blackened Order",
            subtitle: "Last Line of Defense",
            img: "The Blackened_Order.png",
            quote: "We are the blade in the dark, the watchful eye that never blinks.",
            flavorLine: "They remain, protecting a world that will never know their sacrifice.",
            descriptionHtml: `<p class="intro-quote">"We are the blade in the dark, the watchful eye that never blinks."</p><h4>Lore & Backstory</h4><p>The Blackened Order is the only reason vampires haven\'t taken the world for themselves. A clandestine organization forged from the remnants of the Knights Templar, it has evolved into a modern paramilitary force with branches operating globally. Composed of ex-military operatives, law enforcement veterans, and intelligence specialists, the Order wields advanced technology and centuries-old knowledge to systematically track, neutralize, and contain vampiric threats.</p><h4>Strategy & Arsenal</h4><p>Unlike rogue hunters, the Blackened Order is methodical. They maintain extensive records on vampire activity, tracing lineages, feeding grounds, and power structures. Their operatives use specialized firearms, ultraviolet weaponry, silver-infused munitions, and even experimental alchemical deterrents designed to cripple or incapacitate their prey. Every mission is calculated. Every strike is surgical.</p><h4>Secrecy & Sacrifice</h4><p>While their discipline and resources make them the most formidable human threat to vampirekind, their greatest burden is secrecy. They do not operate with public recognition or governmental oversight. Most people will never know they exist. Their war is fought in the shadows, and every fallen agent is another soul buried in an unmarked grave.</p><h4>Reputation Among Vampires</h4><p>To the vampires, the Order is both a sworn enemy and a force of nature. Some vampires dismiss them as mere mortals with guns, but the elders know better. They have fought these hunters for centuries, and they respect the danger the Blackened Order represents.</p><h4>The Initiation</h4><p>Joining the Order is not a choice one makes lightly. Recruits must undergo grueling tests, proving their resolve, their skill, and their ability to kill without hesitation. Those who meet the standards are inducted in a silent ceremony, their past lives erased, their new purpose forged in blood and secrecy.</p><h4>The Vaults</h4><p>Deep within the Blackened Order\'s strongholds lie ancient tomes, relics, and knowledge too dangerous to be released into the world. Some say they have found ways to kill even the most powerful of vampires. Others whisper that among their records lies something even older, secrets that predate the Firstborn.</p><h4>The Curse of the Hunt</h4><p>Few in the Order die of old age. This war is endless, and even the best hunters inevitably meet their match. But death does not always come at the hands of their prey. The longest-serving veterans know that to fight the darkness is to risk inviting it in.</p><p>Some sense their quarry too well, move too fast, react before danger comes—a mind reshaped by years of exposure to spilled vampire blood, to its intoxicating taint, and far too many nights in the dark. Many believe that the Order itself ensures operatives do not live long enough to turn against them.</p><p class="flavor-line">They remain, protecting a world that will never know their sacrifice.</p>`
        },
        {
            name: "Strigari",
            subtitle: "Mistaken Predators",
            img: "Strigori.png",
            quote: "Neither cursed nor blessed. Simply the next step.",
            flavorLine: "They are evolution. A predator unbound by the curse of death.",
            descriptionHtml: `<p class="intro-quote">"Neither cursed nor blessed. Simply the next step."</p><h4>Lore & Backstory</h4><p>Unlike vampires born of the Firstborn, Strigari are living predators—stronger, faster, and deadlier than humans, but bound by flesh rather than immortality. Their origins are unclear, with theories ranging from forgotten experiments to an undiscovered offshoot of humanity. Unlike true vampires, they are not undead; they breathe, feel pain, and can die like any other creature.</p><p>The world often mistakes them for vampires, and many Strigari take advantage of this, allowing fear and superstition to shield them from true scrutiny. Their existence is an unsettling reminder that not all predators lurk in the shadows of myth—some walk among humans in plain sight, indistinguishable until it is too late.</p><p>Vampires regard them with a mixture of disdain and hostility. Some see them as crude imitations, while others recognize the threat they pose—a rival predator unburdened by curses or ancient bloodlines. This tension has sparked conflicts throughout history, with whispers of brutal wars fought between the old and the new.</p><h4>Feeding Habits</h4><p>Strigari do not require blood but grow stronger temporarily when they drink it. The more they consume, the more powerful they become—but also the more uncontrollable. Unlike vampires, they can eat flesh, and many prefer to consume their prey entirely.</p><h4>Reproduction</h4><p>Under normal circumstances, Strigari reproduce naturally, giving birth to their own kind. Their offspring mature rapidly, growing into full hunters within a few years. Some live in loose family groups, but most eventually go solitary.</p><p>However, there exists a rare and gruesome method by which a human can be reborn. If a human consumes the raw, still-warm heart of a Strigari, they may undergo a violent transformation over days or weeks. Their body twists, their senses sharpen, and their hunger shifts toward flesh and blood.</p><p>Most lose themselves to madness before the change is complete. For those who survive, the transformation is permanent. They will never be human again... but they will hunt.</p><h4>Weaknesses</h4><ul><li><strong>Mortal Vulnerability:</strong> They lack supernatural regeneration—wounds heal at a normal rate unless blood is consumed to speed the process. A bullet or blade can kill them like any other creature.</li><li><strong>Bloodlust Overload:</strong> Drinking too much blood triggers uncontrollable savagery, risking loss of rationality.</li><li><strong>Instinctual Hunger:</strong> Unlike vampires, Strigari must consume large quantities of fresh meat regularly or grow weak.</li></ul><h4>Abilities</h4><ul><li><strong>Predatory Surge:</strong> Drinking blood briefly enhances their physical abilities, but the effect fades quickly.</li><li><strong>Unhinging Maw:</strong> Their jaw can stretch unnaturally, allowing them to bite deeply or consume large chunks of flesh.</li><li><strong>Enhanced Physiology:</strong> Naturally stronger and faster than humans, their bodies are built for the hunt.</li></ul><h4>Society & Culture</h4><p>Strigari blend into human society, but only as observers, never truly part of it. Their instincts drive them to hunt, not to rule or manipulate. They may walk unnoticed among humans, but their presence is always felt when the hunt begins. Unlike vampires, who seduce and manipulate their prey, Strigari rely on fear, their transformations unleashing raw, primal terror in those who witness them.</p><p>Some become urban predators, preying on the weak in the underbelly of cities. Others live on the fringes, deep in forests, mountains, or wastelands where their kind can roam freely. Their approach to survival is neither political nor ritualistic—it is simply instinct.</p><h4>Appearance & Distinctions</h4><p>They appear human until they attack. When they strike, their limbs and ears elongate, their joints stretch unnaturally, and their jaw unhinges to reveal rows of needle-like teeth. Unlike vampires, who ensnare their prey with unnatural beauty, a Strigari\'s presence is heralded by something far more visceral—dread.</p><h4>The Breeding Grounds</h4><p>Unlike true vampires, the Strigari do not sire—they are born. Hidden enclaves exist where their kind raise their young, training them in the art of the hunt. Some operate in rural wildernesses, where they can hunt freely. Others live in cities, teaching their children to blend in, to hide in plain sight until the moment they strike.</p><h4>The Blood Wars</h4><p>There are whispers of past conflicts where the Strigari attempted to challenge the ancient bloodlines. Their attempts were brutal but short-lived. They lack the subtlety of the old blood, their hunger too wild, their methods too reckless. However, some believe another war is coming, one where the Strigari may finally learn to outlast their enemies.</p><h4>The Forgotten Origins</h4><p>No one truly knows where the first Strigari came from. Some believe they were a failed experiment—an attempt to create a vampire immune to the weaknesses of the Firstborn. Others think they are a natural evolution, a predator born to replace those who walk among us now.</p><p>Among their own, the oldest tell stories of a single progenitor, a creature neither dead nor alive, waiting to be found.</p><p class="flavor-line">They are evolution. A predator unbound by the curse of death.</p>`
        },
        {
            name: "The Valthoré",
            subtitle: "Bloodied Aristocracy",
            img: "The Valthore.png",
            quote: "We are not merely the heirs to power; we are its architects.",
            flavorLine: "Blood and beauty are their inheritance, and they will never settle for less.",
            descriptionHtml: `<p class="intro-quote">"We are not merely the heirs to power; we are its architects."</p><h4>Lore & Backstory</h4><p>The Valthoré trace their origins back to the courts of the ancient world, where the first of their kind was sired by the Firstborn. They quickly embedded themselves within the upper echelons of human society, mingling with kings, emperors, and merchants, shaping civilization from behind gilded curtains.</p><p>Over centuries, they perfected the art of influence, whispering in the ears of rulers and amassing old money that still dictates the modern world. They have survived the ages through elaborate masquerades, manipulating dynasties, and engaging in arcane blood alchemy, ensuring that their power is as refined as the blood they consume.</p><h4>Feeding Habits</h4><p>The Valthoré consume only the blood of the exquisite—noble bloodlines, intellectuals, artists, and those touched by brilliance. They consider feeding from the mundane beneath them. If they drink from the impure, they wither, losing their legendary beauty and grace.</p><p>They developed blood alchemy, distilling the essence of select humans into exquisite "blood wines," stored in vaults to be consumed in times of scarcity or during lavish clandestine feasts.</p><h4>Reproduction</h4><p>The Valthoré do not turn humans indiscriminately. Their process of siring is ritualistic, requiring years, sometimes decades, of grooming. Only those with rare talent, beauty, or influence are chosen, subjected to a grand initiation before their transformation is sealed with a sip of blood from the eldest of their line.</p><h4>Weaknesses</h4><ul><li><strong>Tainted Blood:</strong> If they consume low-quality blood, they lose their youthful beauty and become gaunt, grotesque, and weak.</li><li><strong>Decadence & Vanity:</strong> Their obsession with luxury, decadence, and material excess can spiral into self-destruction, leading them to squander resources, betray allies for opulence, or lose themselves in endless indulgence.</li><li><strong>Fragile Ego:</strong> Beneath their perfect façade, they harbor an insatiable hunger for validation, growing irrational and desperate when their influence is challenged or ignored.</li></ul><h4>Abilities</h4><ul><li><strong>Majesty:</strong> Their mere presence commands attention, making mortals and weaker vampires alike drawn to them.</li><li><strong>Blood Alchemy:</strong> They can brew and preserve potent blood, allowing them to retain strength without feeding constantly.</li><li><strong>Hypnotic Influence:</strong> Their words drip with suggestion, able to manipulate the thoughts of those who listen.</li></ul><h4>Society & Culture</h4><p>The Valthoré operate in clandestine cabals, mingling with high society while steering mortal affairs. They host masquerade balls where political deals are sealed in whispers and hidden handshakes.</p><p>Though their masquerades are refined, the Valthoré are not without conflict. Rival cabals engage in silent wars, assassinating each other\'s human assets, undermining power structures, and weaving intricate traps of social destruction. A careless insult in a ballroom might not result in a duel but in an entire bloodline being erased from the records of history.</p><h4>Appearance & Distinctions</h4><p>They are unnaturally beautiful, their features sculpted to perfection. They dress in the finest garments, often favoring a blend of antique and modern luxury, exuding timeless elegance.</p><h4>The Burden of Beauty</h4><p>To be a Valthoré is to exist in perfection. Every movement, every word, every choice is weighed against the standards of their lineage. Even among their own, there is no forgiveness for weakness. Those who falter, who let themselves decay, are quietly erased from history. Such an existence is a shameful stain to be removed.</p><p class="flavor-line">Blood and beauty are their inheritance, and they will never settle for less.</p>`
        },
        {
            name: "The Unwritten",
            subtitle: "Echoes of the Past",
            img: "The Unwritten.png",
            quote: "Our world is new, but we are the same.",
            flavorLine: "They have lived a thousand lives, yet they only remember one.",
            descriptionHtml: `<p class="intro-quote">"Our world is new, but we are the same."</p><h4>Lore & Backstory</h4><p>The Unwritten are cursed with a cyclical loss of memory. Every full moon, everything they have learned since their turning is erased, resetting them to the person they were in their last remembered moment as a human. For most, this means waking up in a world they do not recognize, surrounded by strangers, with no explanation for how they got there.</p><p>Their origin is a punishment from the Firstborn, a sentence passed down for a crime against vampirekind so ancient that even the elders have forgotten its nature. The Unwritten are not simply afflicted. They are condemned. Their existence is a sentence that cannot be appealed, an exile from continuity itself.</p><p>Unlike those who carry the burden of eternal memory, the Unwritten are bound to an existence where history cannot hold them. Each cycle strips them of identity, leaving behind only the pieces they manage to preserve.</p><p>Some resist complete dissolution. Though their memories fade, remnants of their humanity linger. Those who do not lose themselves entirely to the reset are the tamest among their kind, clinging to faint impressions of who they once were.</p><h4>Feeding Habits</h4><p>The Unwritten are creatures of habit, often returning to the same places, preying on the same people, unknowingly repeating patterns set long before. Some meticulously document their actions, writing down details of their past victims to avoid being caught. Others embrace the reset, feeding on impulse, knowing that whatever they do will be forgotten soon enough.</p><p>A small number believe that blood itself might hold the key to memory, attempting to drink only from familiar sources in the hope that something will stick—that a taste might trigger something that endures beyond the next cycle.</p><h4>Weaknesses</h4><ul><li><strong>Memory Reset:</strong> Every full moon, they lose all memories gained since their turning, waking up as if no time has passed.</li><li><strong>Fragmented Identity:</strong> Many develop conflicting personalities as different versions of themselves leave instructions they do not always agree with.</li><li><strong>Disjointed Loyalty:</strong> An Unwritten cannot form true bonds, only trust what they have written. Some become ruthless pragmatists, relying only on their own notes, while others fall victim to manipulation, believing lies scribbled in their own hand.</li></ul><h4>Abilities</h4><ul><li><strong>Instinctive Recognition:</strong> While they forget people, they retain impressions. They get vague feelings of trust, danger, or familiarity when encountering someone they have met before.</li><li><strong>Subconscious Reflexes:</strong> Though they lose knowledge, their body retains experience. Their vampiric reflexes remain intact.</li><li><strong>Solar Immunity:</strong> They have an unusual ability to walk in the daylight without any discomfort, helping them blend into regular societies.</li></ul><h4>Society & Culture</h4><p>The Unwritten are viewed as unreliable yet occasionally useful. Some are exploited as disposable operatives, capable of carrying out tasks without remembering who assigned them. Others are pitied, seen as tragic creatures unable to move forward in time.</p><p>To counteract their condition, many leave behind detailed records, journals, recordings, or tattoos with simple phrases like "Trust no one" or "Your name is Aleksander." Some develop elaborate personal rituals, reading the same entries every morning to remind themselves of who they are, piecing together fragments of their past to create an artificial sense of self.</p><p>If they can learn to trust their notes, some manage to carve out something resembling a normal life. They walk unnoticed among mortals, blending into the world as long as they adhere to the instructions they leave for themselves.</p><p>Others give up entirely, living each cycle as if it were their first.</p><h4>Appearance & Distinctions</h4><p>The Unwritten often appear out of place, their clothing and mannerisms frozen in the era of their turning. Some wear modern attire over outdated styles, blending practicality with an unconscious clinging to the past. Many have tattoos or jewelry marked with reminders, messages scrawled in their own hand that they must re-learn every month.</p><p>Their eyes carry a peculiar emptiness, not the weight of age but the hollowness of someone who never truly moves forward.</p><h4>The Question of Persistence</h4><p>Most Unwritten lose everything with the cycle. But every now and then, one of them remembers something. A name. A place. A single moment that refuses to fade.</p><p>No one knows why.</p><p>Some believe it is proof that their curse is not absolute, that memory is not erased but buried, waiting for the right trigger. Others believe that something has gone wrong in the cycle—that they are breaking down, their minds unraveling as fragments of past lives bleed into the present.</p><p>The elder vampires whisper of those who have tried to hold on, who fought the reset and won. But none can say what became of them. No record remains.</p><p class="flavor-line">They have lived a thousand lives, yet they only remember one.</p>`
        },
        {
            name: "The Remnants",
            subtitle: "Eldest Bloodline",
            img: "The Remnants.png",
            quote: "We do not break oaths. We do not kill our own. And we do not forget.",
            flavorLine: "Their memories are eternal. Their past inescapable. Time is their curse.",
            descriptionHtml: `<p class="intro-quote">"We do not break oaths. We do not kill our own. And we do not forget."</p><h4>Lore & Backstory</h4><p>Direct descendants of the Firstborn, the Remnants are bound by ancient laws that dictate every aspect of their existence. They have walked the earth for centuries, either alone or in rare duos, quietly bearing witness to history\'s rise and fall. The weight of centuries is etched into their souls, and each memory is as vital as the blood that courses through them.</p><h4>Feeding Habits</h4><p>Remnants feed rarely but profoundly, partaking in a unique ritual where the sip is not merely nourishment but communion. Each feeding is a sacred act, a merging of memory, emotion, and lifeforce. The Remnant does not merely drink blood; they absorb the essence of the victim, acquiring fleeting glimpses of their thoughts, dreams, and secrets.</p><p>To indulge too deeply is to risk losing oneself, to drown in the lives of others.</p><h4>Reproduction</h4><p>A Remnant may only sire one in their lifetime. The transformation is not an act of violence but a merging, a covenant formed under a solemn moon. This bond is unbreakable.</p><p>A Remnant\'s only true companion is their creator or the one creation they have sired. If their creator perishes, they will wander in mourning, often for centuries, before daring to forge a new bond. The act of creating another is sacred, an extension of one\'s own existence rather than an expansion of their kind.</p><h4>Weaknesses</h4><ul><li><strong>Bound by Ancient Laws:</strong> A Remnant cannot enter a home uninvited, break an oath, step on hallowed ground, or slay another of their kind—even if from a distant bloodline.</li><li><strong>The Weight of Time:</strong> Their perfect recollection of every moment is a burden. Grief never fades, and mistakes cannot be forgotten.</li></ul><h4>Abilities</h4><ul><li><strong>Perfect Recall:</strong> They remember every moment of their existence, granting them knowledge that borders on perfection.</li><li><strong>Glimpses Beyond:</strong> Vague visions allow them to sense emerging events, likely stemming from pattern recognition across centuries.</li><li><strong>Mystic Communion:</strong> Their deep feedings let them absorb not only blood but emotions, knowledge, and fragments of another soul.</li></ul><h4>Society & Culture</h4><p>Remnants exist almost entirely in isolation. When they gather, it is in hidden enclaves, ancient ruins, cloistered manors, or forgotten libraries. These gatherings are fleeting, bound by secrecy and reverence.</p><p>A Remnant and their bonded companion, if they have one, are the only constants in their existence. For those who travel alone, eternity is a solitary path, one walked with dignity and quiet sorrow.</p><h4>Appearance & Distinctions</h4><p>They are striking, in an otherworldly way—pale yet luminous, with silver eyes that seem to carry the light of long-dead stars. Clad in archaic black garments marked with gilded symbols of their lineage, they exude an air of dignified solitude and timeless mystery.</p><h4>The Price of Memory</h4><p>For the Remnants, their greatest strength is also their deepest curse. The weight of centuries bears down upon them, and some lose themselves in the past, speaking in riddles, forgetting the era in which they live. The oldest among them become like living ghosts, so lost in time they can\'t be understood by their modern successors.</p><h4>The Watchers in the Dark</h4><p>Despite their isolation, the Remnants have shaped history from the shadows. Some claim they are the keepers of lost languages, forbidden knowledge, and ancient prophecies. They do not rule; they observe, whispering unseen into the currents of fate.</p><p class="flavor-line">Their memories are eternal. Their past inescapable. Time is their curse.</p>`
        },
        {
            name: "The Lost",
            subtitle: "Feral Punks",
            img: "The Lost.png",
            quote: "We burn, we break, we bleed. Then we do it again.",
            flavorLine: "They are lost. And they will not be tamed.",
            descriptionHtml: `<p class="intro-quote">"We burn, we break, we bleed. Then we do it again."</p><h4>Lore & Backstory</h4><p>Their bloodline is one that has rotted into obscurity, once powerful, now reduced to festering accidents in forgotten history. The Lost were never meant to exist. They are remnants of something older, something buried. Their past was erased, their legacy shattered, and what remains are the survivors—scraping by in the underbelly of society, clinging to existence through sheer defiance.</p><p>Unlike other vampires, their hearts don\'t stop. They beat—furiously, frantically, a relentless drum of unnatural life. The only way to sustain this is through the consumption of adrenaline-soaked or drug-infused blood. Without it, they begin to "burn out," their bodies consuming themselves in a spiral of violent deterioration.</p><h4>Feeding Habits</h4><p>The Lost crave the rush. They feed best on blood coursing with adrenaline born from combat, fear, reckless passion, or the high of intoxication. Calm or passive prey leaves them weak, but drinking from someone in the throes of violence, ecstasy, or delirium sends them into a euphoric high. Many provoke their victims before feeding, drawing out the perfect cocktail of fear, rage, or reckless joy. The more potent the rush, the longer they can stave off the burn.</p><h4>Reproduction</h4><p>No rituals, no choices. Most Lost are made by accident. A victim survives too many feedings, and something inside them refuses to die. Packs don\'t recruit; they force newcomers to prove themselves. Those who can\'t keep up don\'t last long.</p><h4>Weaknesses</h4><ul><li><strong>Burnout:</strong> If they go too long without feeding on adrenaline or drug-infused blood, their overworked hearts give out.</li><li><strong>Silver Paralysis:</strong> Unlike other vampires, they don\'t just suffer; they lock up, helpless and rigid.</li><li><strong>Blood Frenzy:</strong> When hungry, they lose all control, attacking anything that bleeds.</li><li><strong>Mental Decay:</strong> Few live long in their violent reckless lifestyles. Those who do either burn out or break, unraveling under years of chaos.</li></ul><h4>Abilities</h4><ul><li><strong>Blood Rush:</strong> The more wounded they are, the stronger and faster they become.</li><li><strong>Adrenaline Surge:</strong> Danger fuels them, making them faster, sharper, and deadlier.</li><li><strong>Predator's Instinct:</strong> They can sense fear, rage, and excitement, leading them to the best prey.</li></ul><h4>Society & Culture</h4><p>The Lost have no hierarchy, only shifting packs and fleeting alliances. They gather in forgotten places: ruined buildings, fight clubs, anywhere the world discards its unwanted. Power is earned through violence, loyalty is rare, and every night is a gamble between survival and destruction.</p><p>Elder vampires see them as an embarrassment. Feral, impulsive, and doomed. The Lost don\'t care. They aren\'t looking for eternity. They live for the next fight, the next high, the next night that reminds them they\'re still here.</p><h4>Appearance & Distinctions</h4><p>Tattoos, torn clothes, bloodied knuckles, and wild eyes burning with restless hunger. They don\'t move like shadowy predators. They move like street brawlers, addicts chasing one last hit, broken things refusing to stop moving. Their bodies are in constant motion, a side effect of their hyperactive hearts.</p><h4>The Riot Doctrine</h4><p>Among the Lost, violence is more than survival—it is a creed. Newcomers are taught that hesitation is death and that the only rule worth following is to never let the fire in their veins grow cold. The longer they live, the more reckless they become, addicted to the rush of conflict and chaos.</p><h4>The Myth of the Survivor</h4><p>Legends whisper of an ancient Lost, one who refused to die. Some say it still roams the world, a god of violence, setting entire cities ablaze to keep its blood rushing. Others claim it found a way to stabilize the decay, creating the first real path to immortality for their kind. Many, however, simply don\'t care for such tales.</p><h4>The Street Hierarchies</h4><p>Though they claim to have no rulers, the Lost still follow unspoken laws. The strongest fighters, the wildest risk-takers, and the ones with the best connections in the underworld all naturally rise to prominence. Gangs form, break apart, and reassemble in new, more volatile shapes. No alliances last forever, but reputations do.</p><p class="flavor-line">They are lost. And they will not be tamed.</p>`
        },
        {
            name: "The Choir",
            subtitle: "Whisperers in the Night",
            img: "The Choir.png",
            quote: "We do not lead. We endure.",
            flavorLine: "They are the unseen. The unspoken. The last line between secrecy and extinction.",
            descriptionHtml: `<p class="intro-quote">"We do not lead. We endure."</p><h4>Lore & Backstory</h4><p>Formed after a forgotten war, the Choir is a fractured alliance of ancient vampire elders united by one cause—preservation. They do not seek power or domination, only secrecy. In a world teetering on exposure, they remain the last barrier between vampire society and the all-seeing eyes of modern surveillance.</p><p>The Choir is composed of high representatives from the major bloodlines. They are not rulers but stewards. Their meetings are rare, conducted through proxies or encrypted channels. Internal conflict is frequent, but one rule is never broken: no one reveals the truth.</p><h4>Purpose</h4><p>The Choir exists to uphold the masquerade. They intervene only when vampire existence risks exposure—whether by internal squabbles, external threats, or careless breaches. Inaction is their norm. But when they move, they do so with absolute finality.</p><h4>Structure</h4><ul><li>No formal leadership; power shifts with bloodline strength, accumulated favors, and sheer influence.</li><li>The Council is a rotating seat of elders from different lineages.</li><li>Agents, known as <em>Choir Operatives</em>, are embedded in cities to observe, influence, and, when needed, fix.</li></ul><h4>Rules</h4><ul><li>Exposure is death. For individuals or entire covens.</li><li>Council decisions are final. No appeals, no exceptions.</li><li>Factions may feud, but not in public.</li><li>Mortals must remain unaware. Always.</li></ul><h4>Tactics</h4><ul><li>Operate from the shadows, never the spotlight.</li><li>Influence governments, manipulate data, erase surveillance.</li><li>Use misinformation, diplomacy, and when necessary—total erasure.</li><li>Encourage proxy wars to avoid open conflict.</li></ul><h4>Society & Culture</h4><p>Every major city hosts at least one Operative. They rarely enforce. They watch. They nudge. Sometimes, they disappear threats.</p><p>Within the Choir, influence is a currency, respect is earned in blood, and reputation is everything. Outsiders mistake them for bickering aristocrats. Insiders know better—when the Choir sings, it ends in silence.</p><h4>Appearance & Distinctions</h4><p>In mortal society, Operatives blend seamlessly—executives, bureaucrats, priests. Nothing flashy. During clandestine meetings, they wear black garb and veiled masks unique to their bloodlines—bandanas, visors, or sculpted faceplates. Anonymity is sacred.</p><h4>The Doctrine of the Veil</h4><p>The Choir teaches restraint. They are not warriors, but archivists and maintainers of the old ways. Violence is a last resort. But when the Veil is torn, they do not argue. They remove the problem—quietly, permanently.</p><h4>The Myth of the Black Accord</h4><p>An unconfirmed tale whispers of a hidden pact made at the Choir\'s founding. Supposedly, it bound all bloodlines to a singular fate: exposure of one becomes the fall of all. Whether myth or truth, the fear it inspires is real—and effective.</p><p class="flavor-line">They are the unseen. The unspoken. The last line between secrecy and extinction.</p>`
        }
    ],
    Locations: [
        { name: "Oxley Core", txt: "Oxley Core.txt", img: "Oxley Core.png" },
        { name: "Varnin Industrial", txt: "Varnin Industrial.txt", img: "Varnin Industrial.png" },
        { name: "New Bellamire", txt: "New Bellamire.txt", img: "New Bellamire.png" },
        { name: "Halden Heights", txt: "Halden Heights.txt", img: "Halden Heights.png" },
        { name: "Durnell Flats", txt: "Durnell Flats.txt", img: "Durnell Flats.png" },
        { name: "Caywood Terrace", txt: "Caywood Terrace.txt", img: "Caywood Terrace.png" },
        { name: "Grastille", txt: "Grastille.txt", img: "Grastille.png" }
    ],
    Timeline: [
        { name: "The Red Night", date: -5000, dateDisplay: "Ancient Eclipse", txt: "The Red Night.txt", img: "The Red Night.png" },
        { name: "The Divergence", date: -4500, dateDisplay: "Post-Red Night", txt: "The Divergence.txt", img: "The Divergence.png" },
        { name: "The Forgotten War", date: -2000, dateDisplay: "Approx. 2 Millennia Ago", txt: "The Forgotten War.txt", img: "The Forgotten War.png" },
        { name: "The Veiled Century", date: 1550, dateDisplay: "1500-1600 CE", txt: "The Veiled Century.txt", img: "The Veiled Century.png" },
        { name: "The Hollow Pact", date: 1850, dateDisplay: "Mid-19th Century (Approx)", txt: "The Hollow Pact.txt", img: "The Hollow Pact.png" },
        { name: "Fraying Accords", date: 2020, dateDisplay: "Recent Years", txt: "Fraying Accord.txt", img: "Fraying Accord.png" },
        { name: "The Fracturing Veil", date: 2024, dateDisplay: "Present Day", txt: "The Fracturing Veil.txt", img: "The Fracturing Veil.png" }
    ],
    Artifacts: [
        { name: "The Pale Ledger", txt: "The Pale Ledger.txt", img: "The Pale Ledger.png" },
        { name: "The Crimson Census", txt: "The Crimson Census.txt", img: "The Crimson Census.png" }
    ]
};

// --- YouTube Player API Setup ---
// This function is called automatically by the YouTube IFrame Player API script
function onYouTubeIframeAPIReady() {
    console.log("YouTube API Ready");
    youtubePlayer = new YT.Player('youtube-player', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// Called when the player is ready
function onPlayerReady(event) {
    console.log("YouTube Player Ready");
    // Player is ready, but don't play yet. Wait for button click.
}

// Called when the player's state changes (playing, paused, etc.)
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        console.log("Music Playing");
        isMusicPlaying = true;
    } else {
        isMusicPlaying = false;
    }
    // We could potentially handle loop logic here if the URL param fails
}

// Function to attempt starting the music and set volume
function startBackgroundMusic() {
    if (youtubePlayer && typeof youtubePlayer.playVideo === 'function' && typeof youtubePlayer.setVolume === 'function') {
        try {
            youtubePlayer.playVideo();
            console.log("Attempting to play music...");
            // Set volume after calling playVideo (player needs to be active)
            // Volume is a number between 0 and 100
            youtubePlayer.setVolume(40); 
            console.log("Setting volume to 40");
        } catch (e) {
            console.error("Error trying to play video or set volume:", e);
        }
    } else {
        console.warn("YouTube player not ready or available yet for playback/volume control.");
    }
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("Lore Demo Initialized - Carousel Version");
    // Note: YouTube API loads asynchronously, player might not be ready here.

    setupSplashScreen(); // Set up the splash screen button listener

    // Defer main content setup until splash is dismissed
    // setupNavigation(); 
    // loadCategory(Object.keys(assets)[0]);
    // setupBackgroundEffects(); 
    // document.addEventListener('keydown', handleKeyPress);
});

// --- Splash Screen Logic ---
function setupSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const enterButton = document.getElementById('enter-button');
    const mainContentWrapper = document.getElementById('main-content-wrapper');

    if (!splashScreen || !enterButton || !mainContentWrapper) {
        console.error("Splash screen elements not found!");
        // Fallback: If splash elements missing, show main content immediately
        const mainWrapper = document.getElementById('main-content-wrapper');
        if (mainWrapper) mainWrapper.classList.remove('hidden');
        initializeMainContent(); // Setup nav, load first category etc.
        return;
    }

    enterButton.addEventListener('click', () => {
        console.log("Enter button clicked");
        // 1. Start Music
        startBackgroundMusic();

        // 2. Fade out Splash Screen
        splashScreen.style.opacity = '0'; 
        splashScreen.style.pointerEvents = 'none'; // Prevent interaction during fade

        // 3. After fade, hide splash and show main content
        setTimeout(() => {
            splashScreen.classList.add('hidden'); // Set display: none
            mainContentWrapper.classList.remove('hidden');
            mainContentWrapper.classList.add('visible'); // Trigger fade-in
            
            // Initialize main content functionality AFTER it's visible
            initializeMainContent();

        }, 800); // Match the CSS transition duration for splash fade-out
    });
}

// --- Function to Initialize Main Content ---
function initializeMainContent() {
    console.log("Initializing main content...");
    setupNavigation();
    const firstCategory = Object.keys(assets)[0]; // Usually Factions
    if (firstCategory) {
        loadCategory(firstCategory);
    } else {
         document.getElementById('content').innerHTML = '<section class="placeholder-section"><h2>Error</h2><p>No asset categories defined.</p></section>';
    }
    setupBackgroundEffects();
    document.addEventListener('keydown', handleKeyPress);
    // Add focus to the main content area or first nav button for accessibility
    const mainNav = document.querySelector('nav button');
    if (mainNav) mainNav.focus();
}

// --- Background Effects Setup & Interaction ---
function setupBackgroundEffects() {
    // Make sure this references the fog inside the main content, not splash
    fogElement = document.querySelector('#main-content-wrapper #background-effects'); 
    if (!fogElement) {
        console.warn("Background effects element for main page not found.");
        return;
    }
    window.addEventListener('mousemove', handleMouseMove);
}

function handleMouseMove(event) {
    if (!fogElement) return;

    // Calculate mouse position as percentage of window size
    const mouseX = (event.clientX / window.innerWidth) * 100;
    const mouseY = (event.clientY / window.innerHeight) * 100;

    // Update the CSS custom properties
    // Note: We set variables on the element itself, and the ::before pseudo-element inherits them
    fogElement.style.setProperty('--mouse-x', `${mouseX}%`);
    fogElement.style.setProperty('--mouse-y', `${mouseY}%`);
}

// --- Navigation Setup ---
function setupNavigation() {
    const nav = document.querySelector('nav');
    nav.innerHTML = '';
    const categories = Object.keys(assets);

    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.dataset.category = category;
        button.addEventListener('click', () => {
            if (currentCategory !== category) {
                loadCategory(category);
                nav.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            }
        });
        nav.appendChild(button);
    });

    if (categories.length > 0) {
        const initialButton = nav.querySelector(`button[data-category="${categories[0]}"]`);
        if (initialButton) initialButton.classList.add('active');
    }
}

// --- Content Loading and Display Logic ---
async function loadCategory(category) {
    const mainContentWrapper = document.getElementById('main-content-wrapper');
    if (!mainContentWrapper || mainContentWrapper.classList.contains('hidden')) return; // Don't load if main content not visible

    const mainElement = mainContentWrapper.querySelector('main');
    const contentArea = mainContentWrapper.querySelector('#content');

    // --- Start Fade Out ---
    mainElement.classList.add('fade-out');

    // Wait for fade out before changing content
    await new Promise(resolve => setTimeout(resolve, 400)); // Match CSS transition duration

    // --- Load Content (during fade) ---
    currentCategory = category;
    currentItemIndex = 0; // Reset index when loading new category
    contentArea.innerHTML = `<section><h2 id="category-title">Loading ${category}...</h2><div class="carousel-container-placeholder"></div></section>`; // Placeholder

    try {
        let itemsToLoad = [...assets[category]]; // Get a shallow copy of items for the category
        if (!itemsToLoad || itemsToLoad.length === 0) {
            throw new Error(`No items found for category: ${category}`);
        }

        // --- Custom Sorting Logic ---
        const sortOrder = {
            Factions: [
                "Passion Hunters", "The Blackened Order", "The Valthoré", "The Lost",
                "The Grotesque", "The Remnants", "The Unwritten", "The Choir", "Strigari"
            ],
            Locations: [
                "Grastille", "Caywood Terrace", "Durnell Flats", "Halden Heights",
                "New Bellamire", "Oxley Core", "Varnin Industrial"
            ],
            Timeline: [ // Already sorted by date, but this confirms explicit order if needed
                "The Red Night", "The Divergence", "The Forgotten War", "The Veiled Century",
                "The Hollow Pact", "Fraying Accords", "The Fracturing Veil"
            ],
            Artifacts: [ // Order already matches
                "The Pale Ledger", "The Crimson Census"
            ]
        };

        if (sortOrder[category]) {
            const desiredOrder = sortOrder[category];
            itemsToLoad.sort((a, b) => {
                const indexA = desiredOrder.indexOf(a.name);
                const indexB = desiredOrder.indexOf(b.name);
                // If item not found in desiredOrder, place it at the end
                if (indexA === -1) return 1;
                if (indexB === -1) return -1;
                return indexA - indexB;
            });
        } else if (category === 'Timeline') {
            // Fallback date sort if Timeline wasn't in sortOrder (shouldn't happen now)
            itemsToLoad.sort((a, b) => {
                const dateA = typeof a.date === 'number' ? a.date : -Infinity;
                const dateB = typeof b.date === 'number' ? b.date : -Infinity;
                return dateA - dateB;
            });
        }

        // --- Process Items (Fetch text for non-factions) ---
        let processedItems;
        if (category === 'Factions') {
             // Factions have pre-formatted HTML including quotes/flavor
             processedItems = itemsToLoad.map(item => ({ ...item })); // Use the already sorted items
        } else {
            // Fetch and process for other categories using the sorted itemsToLoad
            const fetchedItemsPromises = itemsToLoad.map(item => {
                const textFile = item.md || item.txt;
                if (!textFile) {
                    console.warn(`Item ${item.name} in category ${category} has no text file defined.`);
                    return Promise.resolve({ ...item, descriptionHtml: '<p>No description available.</p>' });
                }
                const textPath = `${ASSET_BASE_PATH}/${category}/${textFile}`;
                const isMarkdown = !!item.md;

                return fetch(textPath)
                    .then(response => {
                        if (!response.ok) {
                            const error = new Error(`HTTP error loading ${textPath}`);
                            error.status = response.status;
                            throw error;
                        }
                        return response.text();
                    })
                    .then(text => {
                        const descriptionHtml = isMarkdown ? parseMarkdown(text) : formatTxtContent(text);
                        const quoteHtml = item.quote ? `<p class="intro-quote">${item.quote}</p>` : '';
                        const flavorLineHtml = item.flavorLine ? `<p class="flavor-line"><em>${item.flavorLine}</em></p>` : '';
                        return { ...item, descriptionHtml: quoteHtml + descriptionHtml + flavorLineHtml };
                    })
                    .catch(error => {
                        if (error.status === 404) {
                            console.error(`File not found: ${textPath}`);
                            return { ...item, descriptionHtml: `<p class="error-text">Error: Description file not found.</p>` };
                        } else {
                            console.error(`Failed to load/parse ${textPath}: ${error}`);
                            return { ...item, descriptionHtml: `<p class="error-text">Error loading description: ${error.message || 'Unknown error'}.</p>` };
                        }
                    });
            });
            processedItems = await Promise.all(fetchedItemsPromises);
        }

        // --- Final Setup ---
        currentItems = processedItems; // Store the final sorted & processed items globally
        if (!currentItems || currentItems.length === 0) {
             throw new Error(`No processed items available for category: ${category}`);
        }

        buildCarousel(category, currentItems); // Build carousel with sorted items
        updateCarousel(); // Set initial position

        // --- Fade In ---
        mainElement.classList.remove('fade-out');

    } catch (error) {
        console.error(`Error loading category ${category}:`, error);
        contentArea.innerHTML = `<section class="placeholder-section"><h2>Error</h2><p>Could not load content for ${category}.</p><p class="error-text">${error.message}</p></section>`;
        resetCarouselState();
        mainElement.classList.remove('fade-out'); // Ensure fade-in happens even on error
    }
}

function resetCarouselState() {
    currentCategory = null;
    currentItems = [];
    currentItemIndex = 0;
    carouselTrack = null;
    cardElements = [];
}

// --- Carousel Building & Control ---

async function buildCarousel(category, items) {
    const container = document.getElementById('content');
    container.innerHTML = ''; // Clear previous content

    if (!items || !items.length) { // Added check for items array itself
        container.innerHTML = '<p>No items found for this category.</p>';
        resetCarouselState(); // Reset state if no items
        return;
    }

    // 1. Create the main section for the category
    const section = document.createElement('section');
    section.id = `${category.toLowerCase()}-section`;

    // 2. Create the container for the carousel elements
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';

    // 3. Build the inner HTML for the track and cards
    let trackHTML = '<div class="carousel-track">\n';
    items.forEach((item, index) => {
        const imagePath = `${ASSET_BASE_PATH}/${category}/${item.img}`;
        const imgOnError = "this.onerror=null; this.src='./placeholder.png'; this.alt='Image unavailable';";
        const subtitleHtml = item.subtitle ? `<span class="item-subtitle">${item.subtitle}</span>` : '';
        const dateHtml = (category === 'Timeline' && item.dateDisplay) 
                       ? `<span class="item-date">${item.dateDisplay}</span>` 
                       : '';
        trackHTML += `
            <div class="item-card-wrapper" data-index="${index}">
                <div class="item-card-content">
                    <div class="item-image-container">
                        <img src="${imagePath}" alt="${item.name}" loading="lazy" onerror="${imgOnError}">
                    </div>
                    <div class="item-text-content">
                        ${dateHtml}
                        <h3>${item.name}${subtitleHtml}</h3>
                        ${item.descriptionHtml} 
                    </div>
                </div>
            </div>
        `;
    });
    trackHTML += '\n</div> <!-- end carousel-track -->';

    // 4. Add Arrows (if needed - could be outside trackHTML)
    const leftArrowHTML = `<button class="carousel-arrow left" aria-label="Previous" onclick="navigateCarousel(-1)" disabled>&lt;</button>`;
    const rightArrowHTML = `<button class="carousel-arrow right" aria-label="Next" onclick="navigateCarousel(1)">&gt;</button>`;

    // 5. Set the innerHTML of the carousel container
    // Combine arrows and track
    carouselContainer.innerHTML = leftArrowHTML + trackHTML + rightArrowHTML;

    // 6. Append the carousel container to the section
    section.appendChild(carouselContainer);

    // 7. Append the section to the main content area
    container.appendChild(section);

    // 8. Find the track and cards *after* they've been added to the DOM
    carouselTrack = container.querySelector('.carousel-track');
    cardElements = Array.from(container.querySelectorAll('.item-card-wrapper'));

    // Disable right arrow if only one item
    if (items.length <= 1) {
        const rightArrow = container.querySelector('.carousel-arrow.right');
        if (rightArrow) rightArrow.disabled = true;
    }
}

function navigateCarousel(direction) {
    const newIndex = currentItemIndex + direction;
    if (newIndex >= 0 && newIndex < currentItems.length) {
        currentItemIndex = newIndex;
        updateCarousel();
    }
}

function updateCarousel() {
    if (!carouselTrack || cardElements.length === 0) return;

    let translateXValue;
    const screenWidth = window.innerWidth;
    const mobileBreakpoint = 768;

    if (screenWidth <= mobileBreakpoint) {
        // Mobile Centering Logic
        const container = document.querySelector('.carousel-container');
        if (!container) return;

        const containerWidth = container.offsetWidth;
        const activeCard = cardElements[currentItemIndex];
        if (!activeCard) return;

        const cardWidth = activeCard.offsetWidth;
        const cardMargin = parseFloat(getComputedStyle(activeCard).marginLeft); // Get margin (assuming same left/right)
        
        // Calculate the starting offset of the first card
        // This assumes cards start immediately inside the container or accounts for padding/margin if needed
        const initialOffset = cardElements[0].offsetLeft; 
        
        // Calculate the center position of the active card relative to the start of the track
        const cardCenterRelativeToTrack = activeCard.offsetLeft + (cardWidth / 2);

        // Calculate the desired center position within the container
        const containerCenter = containerWidth / 2;

        // The required translation is the difference needed to align the card center with the container center
        const translateAmountPx = containerCenter - cardCenterRelativeToTrack;
        
        translateXValue = `${translateAmountPx}px`;

    } else {
        // Desktop Logic (Existing)
        const cardWidthPercent = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-width').trim()) || 65;
        const cardGapPercent = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-gap').trim()) || 2;
        const totalCardSpacePercent = cardWidthPercent + (cardGapPercent * 2);
        const centeringOffsetPercent = (100 - cardWidthPercent) / 2 - cardGapPercent;
        translateXValue = `calc(-${currentItemIndex * totalCardSpacePercent}% + ${centeringOffsetPercent}%)`;
    }

    carouselTrack.style.transform = `translateX(${translateXValue})`;

    cardElements.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next');
        if (index === currentItemIndex) {
            card.classList.add('active');
        } else if (index === currentItemIndex - 1) {
            card.classList.add('prev');
        } else if (index === currentItemIndex + 1) {
            card.classList.add('next');
        }
        if (index === currentItemIndex) {
             const textContentDiv = card.querySelector('.item-text-content');
             if (textContentDiv) textContentDiv.scrollTop = 0;
        }
    });

    const leftArrow = document.querySelector('.carousel-arrow.left');
    const rightArrow = document.querySelector('.carousel-arrow.right');
    if (leftArrow) leftArrow.disabled = (currentItemIndex === 0);
    if (rightArrow) rightArrow.disabled = (currentItemIndex === currentItems.length - 1);
}

// --- Keyboard Navigation ---
function handleKeyPress(event) {
    if (!currentCategory || currentItems.length === 0) return;
    if (event.key === 'ArrowLeft') {
        navigateCarousel(-1);
    } else if (event.key === 'ArrowRight') {
        navigateCarousel(1);
    }
}

// --- Content Parsing/Formatting Helpers ---

function formatTxtContent(plainText) {
    return plainText
        .split(/\r?\n\s*\r?\n/) 
        .map(paragraph => paragraph.trim().replace(/\r?\n/g, '<br>')) 
        .filter(paragraph => paragraph.length > 0)
        .map(paragraph => `<p>${paragraph}</p>`)
        .join('\n');
}

function parseMarkdown(markdownText) {
    if (typeof marked === 'function') {
        try {
            marked.setOptions({
                gfm: true,
                breaks: false, 
                sanitize: false
            });
            return marked.parse(markdownText);
        } catch (e) {
            console.error("Markdown parsing error:", e);
            return `<p class="error-text">Error parsing description.</p>`;
        }
    } else {
        console.warn("marked.js not available, falling back to basic formatting.");
        return formatTxtContent(markdownText);
    }
} 