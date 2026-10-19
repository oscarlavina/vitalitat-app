export interface Testimonial {
  name: string;
  text: string;
  /** Idioma original del testimonio (no se traduce). */
  lang: "ca" | "es" | "en";
}

export const testimonials: Testimonial[] = [
  {
    name: "Cristina E.",
    lang: "es",
    text: "Mari Ángeles es extraordinaria como profesional y como persona. Tuve la enorme suerte que me atendiera durante todo mi embarazo, lo que me permitió sentirme ágil, sana y feliz hasta el último día. No tuve dolores ni las molestias típicas de la gestación. La quiropráctica equilibra todo el sistema nervioso haciendo que todos los órganos funcionen correctamente. Pude hacer un parto natural sin anestesia debido al excelente estado de mi cuerpo gracias a los ajustes quiroprácticos y a los sabios consejos y apoyo de Mari Ángeles. Ahora, continúa siendo mi quiropráctica y la de mi hijo, confío ciegamente en su criterio y me siento afortunada de poder contar con sus generosos cuidados.",
  },
  {
    name: "Anna B.",
    lang: "es",
    text: "Llevé a mi bebé de dos meses al centro para tratar una plagiocefalia. La ayuda profesional y seguimiento ha sido excelente. Mi hijo ha remitido en su totalidad. Trabajan a nivel global y de desarrollo todos los aspectos relacionados con la salud de los bebés. Para mi, la mejor experiencia y ayuda des de que dí a luz. Facilitan los pagos ofreciendo bonos. Trato inmejorable. Yo me siento agradecida y lo recomiendo al 100%.",
  },
  {
    name: "Javier B.",
    lang: "ca",
    text: "Fa molts anys que conec a la Mari Àngels i gràcies a ella, també la quiropràctica. Migranyes, mal d'esquena i cervicals, estrès..., ni m'enrecordo de tot això. No puc estar més agraït. Gràcies per la teva professionalitat, per la teva passió en ajudar els altres i per poder gaudir d'una excel.lent qualitat de vida!",
  },
  {
    name: "Paula O.",
    lang: "es",
    text: "Imprescindible! Nos ajustamos todos en casa con Mari Angels, ella nos da el equilibrio, la energía y la tranquilidad que no nos dan otros profesionales. Mi hijo de 9 años en su gestión de emociones en clase y en casa, mi hija de 14 años al forzar su cuerpo con la alta competición, mi marido con la gestión del estrés en su trabajo y yo para equilibrar mi vida familiar, laboral y personal. Su investigación constante para conseguir el cuidado de cada uno de nosotros, y los resultados que vemos han hecho que estas visitas sean del todo imprescindibles en nuestras vidas. Es una inversión de salud que nosotros priorizamos por encima de todo, en manos de la mejor y más humana profesional!",
  },
  {
    name: "Xavier R.",
    lang: "ca",
    text: "Ja fa uns anys que conec a la Mari Àngels i sempre s'ha mostrat propera, amable i és una gran professional de la quiropràctica. Gràcies a ella he tornat a córrer amb certa solvència. Em sento millor físicament i puc fer coses de forma natural que abans em costaven força. Dormo millor i ja no tinc mal d'esquena d'una antiga lesió. Des de fa uns mesos hi vaig amb la meva dona i els meus fills perquè els hi va molt bé. Hi anem expressament des de Barcelona. Recomano a tothom anar-hi.... hi quedareu encantats!!",
  },
  {
    name: "Ramon G.",
    lang: "es",
    text: "Un espacio muy acogedor, Yolanda que te recibe y te trata con una paz y un cariño exquisito, Mari la doctora te explica las cosas de manera muy llana y comprensible, te ve cosas que tú ni siquiera le has dicho... te ajusta superbien tu cuerpo. Yo llevo muchos años con varios problemas nerviosos y me ha dado mucha confianza, sabe lo que toca y donde toca. La recomiendo 100%. Solo tengo que decir que cada vez que voy a que me ajuste, hago 160 km, 80 ida y 80 vuelta. Poco mas hay que decir.",
  },
  {
    name: "Sandra M.",
    lang: "es",
    text: "Recomendable 100% te ayudan a tener mejor calidad de vida y en pocas sesiones se nota la mejoría tanto en movilidad, como en la disminución del dolor. Mari Angels es muy profesional.",
  },
  {
    name: "Carol M.",
    lang: "en",
    text: "Having used chiropractors off and on for several years, in the very best sense, Mari Angeles is like none other. She approaches the body as a whole, not only focusing on the areas where there is discomfort or pain. Mari's methodology combined with her compassionate and warm personality have a very calming effect. Hats off to Mari for greatly improving my overall health and quality of life.",
  },
  {
    name: "Núria S.",
    lang: "ca",
    text: "Una experiencia genial. Bon tracte i la Mari Àngels encantadora. Si vols millorar en qualitat de vida has de visitar Vitalitat quiropractica. No podras deixar-ho. Bons consells, bon tracte surts com nou i molt important tenir continuïtat, és clau. Els meus fills de 16 i 12 anys tambe son asidus i tots pensem el mateix. Mans màgiques! Ets la nostre Chaman! Gracies Mari Àngels!",
  },
  {
    name: "Ana V.",
    lang: "es",
    text: "Mi experiencia está siendo muy buena, he mejorado de mis dolencias mucho y lo más importante, no tomo pastillas para el dolor!!!!",
  },
];

export const heroImages: string[] = [
  "Embarazada-1.jpg",
  "DSC00316-scaled.jpg",
  "DSC00157-scaled.jpg",
  "DSC00275-scaled.jpg",
].map((file) => `/images/${file}`);

export const counters = [150000, 206, 1, 1];

export const contact = {
  phone: "621 237 685",
  phoneHref: "tel:+34621237685",
  email: "vitalitatquiro@gmail.com",
  addressStreet: "Avda. Cubelles 40",
  addressCity: "08800 Vilanova i la Geltrú",
  // PROVISIONAL: sustituir por la URL de la ficha de Vitalitat en Quiropractica.com
  directoryHref: "https://www.quiropractica.com",
  addressHref: "https://g.page/vitalitatquiro?share",
  social: [
    { name: "Instagram", href: "https://www.instagram.com/vitalitat_quiropractica/" },
    { name: "Facebook", href: "https://www.facebook.com/profile.php?id=100064114121377" },
    { name: "YouTube", href: "https://www.youtube.com/channel/UCrdR3lhPxaDGvutYBQ1s7Hg/featured" },
    { name: "WhatsApp", href: "https://wa.link/rr0bub" },
  ],
};
