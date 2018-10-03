��    8      �  O   �      �  9  �       6  *  V  a  �  �	     �    �  7   �     �     �     �       �    
   �  e   �     W  2   r     �  �  �  �   �     �     �  |  �  >   M     �  
   �  
   �     �  �  �  �  Q  ;   �          0  �   C  �  �  b   J  �  �     8"  	   S"  �   ]"  �   <#  [   $  |  d$  4  �%  �  '  V   �(     )     �)     �)  "   �)     �)  0   �)  �   -*  @  �*     �+  �  ,  h  �-  6   '/  ;  ^/  �  �0  F  l3     �4  �   �4  @   �5      6     6     %6     D6  �  `6     >9  y   K9  &   �9  9   �9     &:  :  >:  .  y;     �<  *   �<  �  �<  @   �>  
   �>  
   ?     ?     ?  �  '?  �  �B  :   �E     �E     �E     F  �  �F  ^   =H  �  �H  %   }K  	   �K  	  �K  �   �L  a   �M  �  N  �  �O  �  LQ  `   4S  �   �S  +   .T  '   ZT  )   �T     �T  <   �T  �    U  p  �U     W     8           2          "   %   ,      .         
      *       4            0          3           /      6      -                         !                 $   7              5         '                                   )              1   	             #             &   +   (       A %(license)s license allows you to do practically anything noncommercial with the idea and code of the Chronogeoscope, provided you credit authorship to Roberto Casati and Glen Lomax. Commercial uses of the idea or the code should be approved by its authors. Please read the relevant texts at creativecommons.org A Southern perspective A sundial whose stylus coincides with the North (or the South) Pole and is parallel to the Earth's axis just indicates where on Earth it is now midnight, by pointing its shadow towards a meridian. On each point on that meridian it is now midnight (and of course, at some of those places a midnight sun shines). Accordingly, a clock can misinform you about your location. It tells you that it is noon now. And now it is noon in Paris. The clock tells you that you are on the Paris meridian. But you are actually in London. It is 11am in London. If at 11am you look at you clock in London and it tells that it is noon, you may philosophically claim that the clock is not misinforming you, as it is telling what time it is now in Paris. But in your less philosophical moments, you would claim that the clock is plain wrong. Because it tells you that you are on the Paris meridian, and you know you are in London. An Azimuthal Equidistant Projection is mounted on a 24-hour clock face. The hour hand is replaced by an indicator of the current position of the clock (the "red dot"). Centering the projection on the South Pole aligns the clockwise spin's direction of the Earth (as seen from the South Pole) with the traditional clockwise movement of the clock's hand. The same projection could be mounted on the face of an equatorial sundial set for the Southern hemisphere. Android version At this point, the key idea is to find your location on the map. This is done either by entering the location directly in the Latitude and Longitude boxes, or by allowing the software to retrieve your position. You position is then indicated by the red dot. Can you explain the strange shape of the night shadow ? Choose a city Chronogeoscope Chronogeoscope for Android Confidentiality Rules Consider a 24 hours dial. In place of the marks for 12 hours, it has marks for 24 hours. Make it a bit more complex. Instead of the hour hand, a miniature map of the globe as projected from the South pole occupies the whole of the clock's face. In the projection (an azimuthal equidistant projection), the South Pole is at the center of the face, and the North Pole is degenerately represented by the outmost circumference. Meridians are represented by straight lines, i.e. rays emanating from the center; parallels are concentric circles. The miniature map slowly revolves clockwise around the center, coming full circle in 24 hours. Abstract from time zones, with their irregular shapes and quantizing purposes. Disclaimer Everything is published on GitHub with setup instructions to host your own or to try and improve it ! Find the source code at :  Glen Lomax is an independent researcher and coder. Greenwich mean time Have the movement set relative to a standard of time, for instance by setting 00:00 at the Greenwhich meridian. Determine where you are, and you'll know your time. Or, conversely, determine where in the world it is now the time you read on the dial, and you'll know where you are. Suppose your position is given by a GPS and translated on the revolving miniature map by a red dot. The number you'll read at the end of the meridian on which the red dot lies is your current time. Take away the map, just leaving the red dot and the meridian. This is almost an ordinary clock's hour hand. In an ordinary (24 hours) clock, you just cannot see the map behind the meridian. But the map is there – and the hand is just a meridian on that map: your meridian. Here comes the important part: the way we built it, the red dot does not talk to a timepiece that tells the hour, but to a GPS that tells the place. At this point it uses a timer – not a clock – that sets the rotation at the 24 hour period. How did we do it ? How to make the most of it ? In the Boreal Summer=Austral Winter (June through September) the shadow engulfs the South Pole and does not touch the North Pole, which in the Azimuthal Equidistant Projection is a degenerate point, as it coincides with the outer perimeter of the map.
In the Austral Summer/Boreal Winter (December through March) the shadow engulfs the degenerate representation of the North Pole. Is it possible to give more details about the Chronogeoscope ? Jump to city : Latitude : Local time Longitude : Many complaints have been addressed to the Northern bias in geographic representation: in most maps, North is up, South is down. The Chronogeoscope is centered on the South pole, because when seen from above the South Pole, the Earth spins clockwise, and we wanted to keep the clockwise analogy with ordinary clocks. Had we centered it on the North Pole, we would have displayed a counterclockwise rotation. The clockwise constraint and the use of the Azimuthal Equidistant Projection allow us to explore a Southern Perspective on geographic representation. In the Chronogeoscope we simply get rid of the up-down couple and replace it with the center/periphery couple: South is at the center, and North is everywhere at the periphery (remember, the North Pole is to be found at the end of each meridian, and as all meridians radiate from the South Pole, the North Pole is everywhere on the outer border of the map.) Perfectly working clocks can fail to tell the time. If you are at the South Pole, the red dot is at the center of the clock's face. It lies on every meridian. If you are at the North Pole, the red dot spreads and occupies the outer circumference; there too it lies on every meridian. Fair enough: at the North and the South Pole it does not make sense to ask for the hour. Two travelers heading north from different starting points who meet at the North Pole could only observe the differences between the readings of their clocks. Their clocks at the poles only indicate the direction they are coming from; they only contain spatial information. Roberto Casati is a Senior researcher with the French CNRS. Solar time at your position The Chronogeoscope The Chronogeoscope is an educational software that makes it possible to study the conceptual tie between time and place in a watch. The Chronogeoscope is not a measuring or a precision instrument. It is not a clock, but an approximate model of the Earth's spin. Its use is meant to be purely educational or recreational. Do not use it for telling the time, setting appointments, planning a trip to the airport etc. we cannot take any responsibility for uses that go beyond the intended educational use of the software. The Chronogeoscope software and this explanatory text are published under the license %(license)s. The Cronogeoscope is a slow educational device. It spins at the angular speed of the Earth, (15°/hour), thus your vision can't tell that it moves. You have to wait and use your memory to realize the change. Sure enough, the general trend is towards optimizing learning time ("the quicker, the better"); unfortunately we cannot offer time shortcuts here (of course you can shot a time lapse of the web page.) Here is a suggestion for educators: display it in the morning, when class begins. Then go back to it later in the day. Compare it with the movement of an ordinary clock - that spins twice as fast. Take screenshots and post them to the walls. The earth as its own clock The idea: The shaded area represents the night on Earth. The Sun is to be found in the direction of Noon. The shape of the shadow depends on two factors: day of the year and peculiar features of the Azimuthal Equidistant Projection. This application uses your position only locally. Thus your location isn't shared with us or stored anywhere. Except for viewing statistics on this webpage, we don't keep any information about our users. Together, Casati and Lomax have published the open source educational software %(astrini)s. Used on Earth, a clock does not only tell the time, it also tells what meridian you are on (modulo time zones). For instance, it tells you that it is noon now. And now it is noon in Paris. Hence the clock tells you that you are on the Paris meridian. In order to draw this conclusion from the fact that is noon now, the only thing you have to know is that it is now noon in Paris. We added another hand that does take input from a real clock: whereas the red dot specified solar time, the thin hand signals the actual conventional time (for instance, this takes into account daylight savings: during the summer, you can see that real times places you to the East of your current location!) We divided the time on the watch's face not in 12, but in 24 hours. We then turned the clock's face into a representation of the Earth centered on the South Pole. This way the Earth's map rotates the way the Earth does (seen from above the South Pole, the rotation is clockwise.) Then we set the period of the rotating map's spin: 24 hours exactly. If you are patient enough, you will see that the map gently rotates. We have an application on Google Play. Try it by following this link to the app-store: We wanted to show that hidden in each watch's face there is an implicit image of the Earth's spin. The Earth is its own clock ! What is a %(license)s license ? What is the Chronogeoscope ? Where can I find the source code ? Who are we ? Why use this particular type of representation ? Your location is the hour hand on a 24 hour-period rotating map of the world. This means that you can use space to tell the time. Your location on a map of the Earth provides the hour hand of a 24 hour clock. By reading the number on the hour ring corresponding to your location, you know what the solar time of your location is. So you are not actually using a clock, but a model of the Earth's rotation, in order to get an idea of the current time. by %(roberto)s and %(glen)s, Project-Id-Version: PROJECT VERSION
Report-Msgid-Bugs-To: EMAIL@ADDRESS
POT-Creation-Date: 2018-06-25 16:32+0200
PO-Revision-Date: 2018-10-03 03:35+0200
Last-Translator: Glen Lomax <glenlomax@gmail.com>
Language: fr
Language-Team: fr <LL@li.org>
Plural-Forms: nplurals=2; plural=(n > 1);
MIME-Version: 1.0
Content-Type: text/plain; charset=utf-8
Content-Transfer-Encoding: 8bit
Generated-By: Babel 2.6.0
X-Generator: Poedit 1.8.7.1
 Une licence %(license)s vous autorise à faire presque tout de non commercial avec l'idée et le code du chronogéoscope, à condition de citer les créateurs Roberto Casati et Glen Lomax. L'approbation des auteurs est requise pour tout usage commercial de l'idée ou du code du chronogéoscope. Vous pouvez consulter les textes légaux sur creativecommons.org Pourquoi ce point de vue sur l'hémisphère Sud&nbsp;? Un cadran solaire dont le stylet coïnciderait avec le pôle Nord (ou Sud) et qui serait parallèle à l'axe de la Terre n'indiquerait par son ombre que le méridien où il fait minuit. Sur chaque point de ce méridien il est maintenant minuit (et évidement, un soleil de minuit brille sur certains de ces points). D'une manière réciproque, une montre peut vous tromper à propos de votre position. Elle indique qu'il est midi maintenant. Et il est midi maintenant à Paris. Vous seriez donc sur le méridien de Paris... alors que vous êtes en réalité à Londres. Il est 11h à Londres, si à 11h vous regardez votre montre à Londres et elle vous indique midi, vous pourriez prétendre philosophiquement que la montre ne vous trompe pas, car elle vous indique l'heure parisienne. Si parfois votre approche philosophique s'estompe, la tentation de reprocher une erreur à cette montre sera grande. En effet, elle vous indiquerait que vous vous trouvez sur le méridien de Paris alors que vous savez avec certitude être à Londres. En centrant la projection de la carte sur le pôle Sud, nous nous alignons sur la rotation dans le sens des aiguilles d'une montre de la Terre (lorsqu'elle est vue du pôle Sud) pour respecter ce sens intuitif. Cette projection pourrait-être montée sur la face d'un cadran solaire équatorial prévu pour l'hémisphère Sud. Version Android Il vous reste à comprendre où vous vous trouvez sur la carte. Cela se fait en entrant manuellement votre Latitude et votre Longitude, ou en autorisant le logiciel à accéder à votre position. Celle-ci est indiquée par le point rouge sur la carte. Comment expliquer la forme étrange de l'ombre de la nuit&nbsp;? Choisissez une ville Chronogéoscope Le Chronogéoscope sur Android Règles de confidentialité Considérons un cadran de 24 heures à la place du classique cadran de 12 heures. Complexifions un peu. À la place de l'aiguille des heures, une carte miniature du monde centrée sur le pôle Sud occupe l'intérieur du cadran. La projection azimutale équidistante employée à cet effet place le pôle Sud au centre et le pôle Nord devient un point dégénéré représenté par le bord circulaire de la carte. Les méridiens sont représentés par des lignes droites, i.e. des rayons émanant du centre, les parallèles sont des cercles concentriques. La mini-carte tourne doucement autour du centre, un tour complet en 24 heures. Ici, abstraction est faite des fuseaux horaires irréguliers et de leur intérêt organisationnel. Usage prévu Tout le code est publié sur GitHub avec les instructions pour héberger, essayer ou améliorer le chronogéoscope&nbsp;! Accédez au code source à l'adresse : Glen Lomax est un chercheur et développeur indépendant. Heure moyenne Greenwich Si on retire la carte, ne laissant ainsi que le point rouge et son méridien-aiguille, il demeure une montre presque ordinaire. Sur une montre ordinaire (de 24 heures), on ne peut voir la carte derrière le méridien. Mais pourtant elle est là ! Et l'aiguille est juste un méridien de la carte : votre méridien. Ce qu'il est important de remarquer c'est que le point rouge n'est pas ajusté en fonction d'une mesure du temps mais bien en fonction d'une mesure de l'espace. En ajoutant à ça un minutage pour assurer la rotation de la carte suivant la période de la Terre on obtient une aiguille donnant l'heure.  Comment ça marche&nbsp;? Comment en tirer parti efficacement&nbsp;? Pendant l'été boréal = l'hiver austral (de Juin à Septembre) l'ombre recouvre le pôle sud et n'atteint pas le pôle nord. Notez que la projection azimutale équidistante associe le pôle Nord à un point dégénéré coïncident avec le périmètre extérieur de la carte.
Pendant l'été austral = l'hiver boréal (de Décembre à Mars) l'ombre recouvre la représentation dégénérée du pôle Nord et n'atteint pas le pôle Sud au centre du cadran. Quelques détails supplémentaires sur le chronogéoscope&nbsp;? Aller à : Latitude : Heure locale Longitude : De nombreux reproches ont été portés à l'égard du biais nordiste au sein des représentations géographiques : sur la plupart des cartes le Nord est en haut et le Sud en bas. Le chronogéoscope est centré sur le pôle Sud, parce que lorsqu'elle est vue du pôle Sud, le Terre tourne dans le sens des aiguilles d'une montre, et que nous voulions préserver l'analogie avec les montres ordinaires. Cette contrainte et la projection azimutale équidistante nous permet d'explorer un point de vue sudiste sur les représentation géographiques. Pour le chronogéoscope nous nous sommes débarrassés du couple Nord/Sud pour le remplacer par le couple centre/pérphérie : Le Sud est au centre, le Nord partout à la périphérie (rappelez-vous que le pôle Nord doit être à l'extrémité extérieure de chaque méridien. Étant donné que tous les méridiens irradie du pôle Sud, le pôle Nord est partout sur le bord extérieur de la carte). Une montre en parfait état de marche peut aussi échouer à donner l'heure. Par exemple, si vous êtes au pôle Sud, le point rouge est au centre de la montre. Il croise tout les méridiens. Si vous êtes au pôle Nord, le point rouge recouvre la circonférence de la carte, et il croise aussi tous les méridiens. Acceptons : aux pôles Nord et Sud, il est insensé de demander l'heure. Deux voyageurs se dirigeants vers le Nord à partir de points de départs différents et qui se croiseraient au pôle Nord ne pourraient que constater la différence entre leurs deux montres. Leurs montres aux pôles n'indiquent que la direction d'où ils viennent : elle ne contiennent que de l'information spatiale. Roberto Casati est directeur de recherche au sein du CNRS. Heure solaire à votre positon Chronogéoscope Le chronogéoscope est un logiciel éducatif pensé pour étudier le lien conceptuel entre le temps et le lieu sur une horloge. Le chronogéoscope n'est pas un instrument de mesure et nous ne garantissons pas sa précision. Ce n'est pas une montre, mais un modèle approximatif de la rotation de la Terre. Il est prévu pour un usage purement éducatif ou récréatif. Ne l'utilisez pas pour assurer un rendez-vous, planifier un voyage à l'aéroport etc. Nous ne pouvons prendre aucune responsabilité devant des usages dépassant le but éducatif de ce logiciel. Le logiciel chronogéoscope et ce texte explicatif sont publiés sous la license %(license)s.  Le chronogéoscope est un outil éducatif particulièrement  lent. Il tourne à la vitesse angulaire de la Terre, 15°/heure, et votre vision ne peut voir qu'il bouge. Il faut attendre et user de sa mémoire pour visualiser le changement. Même si la mode est à l'optimisation du temps d'apprentissage (plus vite c'est mieux) nous ne pouvons malheureusement pas offrir de raccourci temporel (vous pouvez toujours filmer un timelapse de la page web). Une suggestion pour les professeurs : montrez le chronogéoscope le matin quand le cours commence. Et retournez-y plus tard dans la journée. Comparez le avec le mouvement d'une montre classique (qui tourne deux fois plus vite). Faites des captures d'écran et postez les sur les murs. La Terre est sa propre horloge&nbsp;! L'idée : La surface assombrie représente la nuit sur Terre. Le Soleil est ainsi placé dans la direction de midi sur notre cadran. La forme de l'ombre dépend alors de deux facteurs&nbsp;: le jour de l'année et les particularités de la projection azimutale équidistante. Cette application n'utilise votre position que localement. Ainsi votre position n'est pas partagée avec nous  et n'est stockée nulle part. Mise à part des statistiques de visualisation de cette page web, nous ne conservons aucune donnée utilisateur. Ensemble, Roberto Casati et Glen Lomax ont publié le logiciel éducatif open-source %(astrini)s. Utilisée sur Terre, une montre ne permet pas seulement de lire l'heure, elle indique aussi sur quel méridien vous vous trouvez (au fuseau horaire près). Par exemple, si elle indique midi maintenant. Et il est maintenant midi à Paris. Alors vous pouvez en déduire que vous vous situez sur le même méridien que Paris. Cette conclusion dérive seulement du fait qu'il est midi à Paris comme sur votre montre. Nous avons ajouté une autre aiguille qui est elle réglée d'après une mesure du temps, une vraie horloge. Alors que le point rouge révèle le temps solaire, l'aiguille plus fine affiche l'heure conventionnelle (elle prend en compte par exemple le décalage heure d'hiver / heure d'été). Vous pouvez observer que le temps classique nous place décalé vers l'Est par rapport à notre position réelle. Nous avons divisé le cadran de l'horloge en 24 heures et pas 12 comme d'habitude. Puis nous projetons la Terre centrée sur le pôle Sud sur un cadran rotatif. Ainsi la carte de la Terre tourne en suivant la rotation actuelle de la Terre. Lorsqu'elle est vue face au pôle Sud, la Terre tourne dans le sens des aiguilles d'une montre. Enfin, la période de rotation complète de la carte est réglée sur 24 heures. Avec un peu de patience, vous pourrez voir la carte tourner doucement. Nous avons une application sur Google Play. Essayez-la en cliquant sur le lien ci-dessous&nbsp;: Nous voulons montrer que derrière toute montre à aiguilles se cache une image implicite de la Terre en rotation. La Terre est sa propre horloge&nbsp;! Qu'est-ce qu'une licence %(license)s&nbsp;? Qu'est-ce-que le chronogéoscope&nbsp;? Où puis-je trouver le code source&nbsp;? Qui sommes-nous&nbsp;? Pourquoi utiliser cette représentation particulière&nbsp;? Votre position est l'aiguille d'une montre-carte rotative réglée à un tour par 24 heures. Cela signifie que l'on peut lire l'heure dans l'espace. Votre position sur une carte de la Terre représente l'aiguille d'une horloge à cadran de 24 heures. En lisant le nombre indiqué par l'aiguille correspondant à votre position, vous pouvez connaître le temps solaire à cette position. Vous utilisez alors un modèle de la rotation de la Terre, et non pas une horloge, pour vous faire une idée de l'heure qu'il est. par %(roberto)s et %(glen)s, 