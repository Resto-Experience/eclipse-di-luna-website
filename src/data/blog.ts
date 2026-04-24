export type BlogPost = {
  slug: string;
  title: string;
  preview: string;
  image: string;
  content: string; // body HTML-ish (paragraphs separated by \n\n)
  publishedAt: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'tapas-bar-good-food-and-fresh-drinks-in-alpharetta-ga',
    title: 'Tapas Bar: Good Food and Fresh Drinks in Alpharetta GA',
    preview:
      'When people look for a tapas bar Alpharetta GA, they\u2019re usually after something more flexible than a traditional dinner. Something you can share, extend, and enjoy without a set structure.',
    image: '/images/blog/tapas-bar-alpharetta.avif',
    publishedAt: '2026-03-12',
    content: `When people look for a tapas bar in Alpharetta GA, they\u2019re usually after something more flexible than a traditional dinner. Something you can share, extend, and enjoy without a set structure. That\u2019s exactly what we\u2019ve built at Eclipse di Luna.

Our menu spans Latin and Spanish traditions \u2014 from patatas bravas and gambas al ajillo to ceviche and pulpo a la gallega. Each plate is designed to travel around the table, sparking conversation along the way.

Pair your tapas with a hand-crafted cocktail or a glass of Spanish wine, and settle in for a night that unfolds at its own pace.`,
  },
  {
    slug: 'ensalada-de-manzana-a-fresh-counterpoint-on-the-tapas-table-y4321',
    title: 'Ensalada de Manzana: A Fresh Counterpoint on the Tapas Table',
    preview:
      'Looking for an authentic Spanish tapas experience? Then a refreshing small plate is a must on your table. The thing is, the ensalada de manzana define the rhythm of a tapas table.',
    image: '/images/blog/ensalada-manzana.avif',
    publishedAt: '2026-03-05',
    content: `Looking for an authentic Spanish tapas experience? A refreshing small plate is a must on your table. The ensalada de manzana helps define the rhythm of a tapas table \u2014 it resets the palate between richer bites and keeps the pace light.

Our version brings crisp apple, tender greens, crumbled manchego, and a light sherry-vinegar dressing together for a bite that\u2019s bright without being austere.

Serve it alongside warm tapas like croquetas or albóndigas to balance heat with freshness.`,
  },
  {
    slug: 'ceviche-de-pescado-at-eclipse-di-luna',
    title: 'Ceviche de Pescado at Eclipse di Luna',
    preview:
      'Ceviche de pescado belongs to warm evenings, shared tables, and the moment when the first round of plates arrives and resets the pace of the meal.',
    image: '/images/blog/ceviche.avif',
    publishedAt: '2026-02-26',
    content: `Ceviche de pescado belongs to warm evenings, shared tables, and the moment when the first round of plates arrives and resets the pace of the meal. Across Latin America and Spain\u2019s coastal kitchens, ceviche takes countless shapes \u2014 but at its heart is always the same idea: fresh fish, citrus, and a handful of bright supporting ingredients.

At Eclipse di Luna, we lean into that tradition with our own twist. Sustainably-sourced whitefish is cured in lime, tossed with red onion, cilantro, and just enough chili to wake the palate.

Pair with a crisp Albariño or a sparkling glass of cava for the full experience.`,
  },
  {
    slug: 'mejillones-en-salsa-de-jitomate-the-perfect-coastal-meal',
    title: 'Mejillones en Salsa de Jitomate, the Perfect Coastal Meal',
    preview:
      'At Eclipse di Luna, mejillones have a way of slowing things down in the best possible sense. For those customers who might be new to them, mejillones are mussels \u2014 a shellfish prized for their tender texture.',
    image: '/images/blog/mejillones.avif',
    publishedAt: '2026-02-19',
    content: `At Eclipse di Luna, mejillones have a way of slowing things down in the best possible sense. For those customers who might be new to them, mejillones are mussels \u2014 a shellfish prized for their tender texture and their ability to soak up whatever sauce they\u2019re cooked in.

Our mejillones en salsa de jitomate lean on a bright tomato base, enriched with garlic, white wine, and a touch of pimentón. Serve them with a crusty baguette for sopping up every drop.

It\u2019s a dish made to be shared, and one that rewards taking your time.`,
  },
  {
    slug: 'pulpo-a-la-gallega-experience-galicias-signature-octopus',
    title: 'Pulpo a la Gallega: Experience Galicia\u2019s Signature Octopus',
    preview:
      'Pulpo a la gallega is a traditional octopus preparation that has traveled far from its hometown, but it still carries the same appeal that made it a favorite on Spanish tables for centuries.',
    image: '/images/blog/pulpo.avif',
    publishedAt: '2026-02-12',
    content: `Pulpo a la gallega is a traditional octopus preparation that has traveled far from its hometown, but it still carries the same appeal that made it a favorite on Spanish tables for centuries.

Our pulpo starts slow-cooked until tender, sliced onto a bed of soft potatoes, and finished with a generous dusting of pimentón de la Vera and a glug of Galician olive oil.

Simple, coastal, and unforgettable \u2014 it\u2019s the dish we point guests to when they want to experience Spain\u2019s north in a single bite.`,
  },
  {
    slug: 'macarrones-con-queso-101-the-complete-guide-to-mac-and-cheese',
    title: 'Macarrones con Queso 101: The Complete Guide to Mac and Cheese',
    preview:
      'Macarrones con queso, in English mac and cheese, is one of the world\u2019s most beloved comfort foods. While its name may vary across cultures and languages, the fundamental appeal remains universal.',
    image: '/images/blog/macarrones-con-queso.avif',
    publishedAt: '2026-02-05',
    content: `Macarrones con queso, in English mac and cheese, is one of the world\u2019s most beloved comfort foods. While its name may vary across cultures and languages, the fundamental appeal remains universal: tender pasta enrobed in a cheese sauce that hits every note \u2014 salty, creamy, slightly nutty.

At Eclipse di Luna, we layer manchego and a sharp cheddar, finishing under the broiler for a golden crust.

It\u2019s the dish that brings everyone back to the table \u2014 even those who swore they weren\u2019t hungry.`,
  },
  {
    slug: 'panqueques-a-sweet-way-to-start-the-day',
    title: 'Panqueques: A Sweet Way to Start the Day',
    preview:
      'If there\u2019s one dish that can brighten any morning, it\u2019s panqueques. At Eclipse di Luna, we bring them to the table with our own Latin twist.',
    image: '/images/blog/panqueques.avif',
    publishedAt: '2026-01-29',
    content: `If there\u2019s one dish that can brighten any morning, it\u2019s panqueques. At Eclipse di Luna, we bring them to the table with our own Latin twist \u2014 fluffy pancakes stacked tall, crowned with fresh blueberries, softened butter, and rich maple syrup.

Weekends at our locations become a little slower, a little sweeter, when panqueques hit the pass.

Come for brunch and stay for the tapas.`,
  },
  {
    slug: 'platanos-fritos-the-perfect-start-to-your-night',
    title: 'Plátanos Fritos: The Perfect Start to Your Night',
    preview:
      'We love talking about the flavors that light up our tables. And if there\u2019s one bite that gets the whole party smiling, it\u2019s our plátanos fritos.',
    image: '/images/blog/platanos-fritos.avif',
    publishedAt: '2026-01-22',
    content: `We love talking about the flavors that light up our tables. And if there\u2019s one bite that gets the whole party smiling, it\u2019s our plátanos fritos.

Ripe plantains are sliced and pan-fried until the edges caramelize and the centers turn buttery. A sprinkle of sea salt seals the deal.

They\u2019re sweet, savory, and dangerously easy to finish \u2014 the perfect start to any night.`,
  },
  {
    slug: 'patatas-bravas-why-these-spanish-potatoes-are-our-tapas-superstar',
    title: 'Patatas Bravas: Why These Spanish Potatoes Are Our Tapas Superstar',
    preview:
      'When we talk about the most popular Spanish tapas, patatas bravas always top the list. These demonstrate to us how simple ingredients can create something absolutely extraordinary.',
    image: '/images/blog/patatas-bravas.avif',
    publishedAt: '2026-01-15',
    content: `When we talk about the most popular Spanish tapas, patatas bravas always top the list. These demonstrate how simple ingredients can create something absolutely extraordinary.

Our patatas bravas are crisp on the outside, pillowy on the inside, and come crowned with two signature sauces: a smoky bravas made with pimentón, and a garlicky alioli that ties the whole plate together.

One plate is never enough.`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}
