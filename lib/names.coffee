do ->
	generateName = ->
		adjective = 'flaming,aberrant,agressive,warty,hoary,breezy,dapper,edgy,feisty,gutsy,hardy,intrepid,jaunty,karmic,lucid,maverick,natty,oneric,precise,quantal,quizzical,curious,derisive,bodacious,nefarious,nuclear,nonchalant,marvelous,greedy,omnipotent,loquacious,rabid,redundant,dazzling,jolly,autoerotic,gloomy,valiant,pedantic,demented,prolific,scientific,pedagogical'
		animal = 'monkey,axolotl,warthog,hedgehog,badger,drake,fawn,gibbon,heron,ibex,jackalope,koala,lynx,meerkat,narwhal,ocelot,penguin,quetzal,kodiak,cheetah,puma,jaguar,panther,tiger,leopard,lion,neanderthal,walrus,mushroom,dolphin,giraffe,gnat,fox,possum,otter,owl,osprey,oyster,rhinoceros,quail,gerbil,jellyfish,porcupine,anglerfish,unicorn'
		pick = (list) -> 
			n = list.split(',')
			n[Math.floor(n.length * Math.random())]
		pick(adjective) + " " + pick(animal)

	generatePage = ->
		people = 'kirk,picard,feynman,einstein,erdos,huxley,robot,ben,batman,panda,pinkman,superhero,celebrity,traitor,alien,lemon,police,whale,astronaut,chicken,kitten,cats,shakespeare,dali'
		verb = 'on,enveloping,eating,drinking,in,near,sleeping,destruction,arresting,cloning,around,jumping,scrambling,painting,stalking,vomiting'
		noun = 'mountain,drugs,house,asylum,elevator,scandal,planet,school,brick,lamp,water,paper,friend,toilet,airplane,cow,pony,egg,chicken,meat,book,wikipedia,turd,rhinoceros,paris'
		pick = (list) -> 
			n = list.split(',')
			n[Math.floor(n.length * Math.random())]
		pick(people) + "-" + pick(verb) + "-" + pick(noun)

	exports.generatePage = generatePage
	exports.generateName = generateName