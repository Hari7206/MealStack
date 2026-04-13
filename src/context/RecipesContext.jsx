import { createContext, useState } from 'react'

export const recepiecontext = createContext()

// ─── Default recipes — edit images here freely, they always apply ───
const defaultRecipes = [
  {
    id: '1',
    title: 'Butter Chicken Masala',
    description: 'A rich, creamy tomato-based curry with tender chicken. A family favourite that never disappoints.',
    Ingridients: '800g chicken breast\n2 tbsp butter\n1 cup heavy cream\n400g crushed tomatoes\n2 tsp garam masala\n1 tsp turmeric\n1 tsp cumin\n4 garlic cloves\n1 inch ginger\nSalt to taste',
    Instructions: '1. Marinate chicken in yogurt and spices for 30 min.\n2. Sear chicken in butter until golden.\n3. Blend tomatoes, garlic, and ginger into a smooth sauce.\n4. Simmer sauce for 10 min, add cream.\n5. Add chicken and cook for 15 more minutes.\n6. Serve with naan or rice.',
    category: 'dinner', cookTime: '45 min',
    image: 'https://i.pinimg.com/736x/0b/fc/ab/0bfcab4f16e047f2b477687edf615723.jpg',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Spaghetti Carbonara',
    description: 'Silky, cheesy pasta with crispy pancetta. A Roman classic done the authentic way.',
    Ingridients: '400g spaghetti\n200g pancetta\n4 egg yolks\n100g Pecorino Romano\n2 garlic cloves\nBlack pepper\nSalt',
    Instructions: '1. Cook spaghetti al dente.\n2. Fry pancetta until crispy.\n3. Whisk yolks with cheese and pepper.\n4. Toss hot pasta with pancetta off heat.\n5. Add egg mixture and toss quickly.\n6. Serve immediately with extra cheese.',
    category: 'dinner', cookTime: '30 min',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&auto=format&fit=crop',
    createdAt: '2024-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    title: 'Avocado Toast with Poached Egg',
    description: 'Creamy avocado on sourdough topped with a perfectly poached egg. Brunch perfection.',
    Ingridients: '2 slices sourdough\n1 ripe avocado\n2 eggs\n1 tbsp white vinegar\nChili flakes\nLemon juice\nSalt and pepper',
    Instructions: '1. Toast sourdough until golden.\n2. Mash avocado with lemon, salt, and pepper.\n3. Bring water to a gentle simmer with vinegar.\n4. Crack eggs in and poach for 3 minutes.\n5. Spread avocado on toast.\n6. Top with egg and chili flakes.',
    category: 'breakfast', cookTime: '15 min',
    image: 'https://i.pinimg.com/1200x/48/fc/5d/48fc5d29989e28e1255fb81e17ca0ed2.jpg',
    createdAt: '2024-01-03T00:00:00.000Z',
  },
  {
    id: '4',
    title: 'Mango Lassi',
    description: 'A chilled Indian yogurt drink blended with ripe alphonso mangoes. Refreshing and cooling.',
    Ingridients: '2 ripe mangoes\n1 cup plain yogurt\n1/2 cup milk\n2 tbsp sugar\n1/4 tsp cardamom\nIce cubes',
    Instructions: '1. Peel and chop mangoes.\n2. Blend mango with yogurt, milk, and sugar.\n3. Add cardamom and a handful of ice.\n4. Blend until smooth and frothy.\n5. Pour into glasses and serve chilled.',
    category: 'drinks', cookTime: '10 min',
    image: 'https://i.pinimg.com/736x/e8/a3/2a/e8a32a665883d2d1afff0639ca387a33.jpg',
    createdAt: '2024-01-04T00:00:00.000Z',
  },
  {
    id: '5',
    title: 'Classic  Burger',
    description: 'Juicy homemade  patty with caramelised onions and secret sauce in a brioche bun.',
    Ingridients: '500g brioche buns\n1 onion\n4 cheese slices\nLettuce\n2 tomatoes\nMayonnaise\nKetchup\nMustard\nSalt and pepper',
    Instructions: '1 salt and pepper, shape into patties.\n2. Caramelise onions in butter for 20 min.\n3. Grill patties 4 min per side.\n4. Add cheese and melt.\n5. Toast buns.\n6. Assemble with sauce, lettuce, tomato, onion.',
    category: 'lunch', cookTime: '35 min',
    image: 'https://i.pinimg.com/1200x/b9/b7/62/b9b76295d44d75e2255d45d39d866fa0.jpg',
    createdAt: '2024-01-05T00:00:00.000Z',
  },
  {
    id: '6',
    title: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a gooey molten centre. Deadly delicious and surprisingly easy.',
    Ingridients: '150g dark chocolate\n150g butter\n3 eggs\n3 egg yolks\n75g sugar\n50g flour\nPinch of salt\nVanilla extract',
    Instructions: '1. Preheat oven to 200°C.\n2. Melt chocolate and butter together.\n3. Whisk eggs, yolks, and sugar until pale.\n4. Fold in chocolate mixture, then flour.\n5. Pour into greased ramekins.\n6. Bake 12 min. Rest 1 min, invert and serve.',
    category: 'desserts', cookTime: '20 min',
    image: 'https://i.pinimg.com/1200x/7b/cd/8f/7bcd8f98b94d5d7ce6fe9e957ac0113a.jpg',
    createdAt: '2024-01-06T00:00:00.000Z',
  },
  {
    id: '7',
    title: 'Crispy Vegetable Spring Rolls',
    description: 'Golden, crunchy spring rolls stuffed with stir-fried veggies and glass noodles.',
    Ingridients: '12 spring roll wrappers\n200g cabbage, shredded\n2 carrots, julienned\n100g glass noodles\n3 garlic cloves\n2 tbsp soy sauce\nSesame oil\nOil for frying',
    Instructions: '1. Soak noodles, drain and chop.\n2. Stir-fry garlic, cabbage, carrot with soy.\n3. Mix in noodles and sesame oil. Cool.\n4. Place filling in wrapper and roll tightly.\n5. Seal edges with water.\n6. Deep fry until golden and crispy.',
    category: 'snacks', cookTime: '40 min',
    image: 'https://i.pinimg.com/736x/ed/1a/74/ed1a740fe5bfeb75c16ae9f18d70bd7e.jpg',
    createdAt: '2024-01-07T00:00:00.000Z',
  },
  {
    id: '8',
    title: 'Greek Salad',
    description: 'A vibrant, fresh salad with feta, olives, cucumber, and tomatoes in a herby dressing.',
    Ingridients: '3 tomatoes\n1 cucumber\n1 red onion\n200g feta cheese\n100g Kalamata olives\n3 tbsp olive oil\n1 tbsp red wine vinegar\nDried oregano\nSalt and pepper',
    Instructions: '1. Chop tomatoes, cucumber, and onion roughly.\n2. Combine in a large bowl.\n3. Add olives and crumbled feta on top.\n4. Drizzle olive oil and vinegar.\n5. Season with oregano, salt, and pepper.\n6. Toss gently and serve.',
    category: 'lunch', cookTime: '10 min',
    image: 'https://i.pinimg.com/1200x/92/fb/c4/92fbc497e189aced07708b989c9b8ce0.jpg',
    createdAt: '2024-01-08T00:00:00.000Z',
  },
  {
    id: '9',
    title: 'Fluffy Pancakes',
    description: 'Thick, pillowy American-style pancakes with a golden crust and soft centre.',
    Ingridients: '2 cups flour\n2 tbsp sugar\n2 tsp baking powder\n1/2 tsp salt\n2 eggs\n1.5 cups milk\n3 tbsp melted butter\nVanilla extract',
    Instructions: '1. Whisk dry ingredients together.\n2. Whisk wet ingredients in another bowl.\n3. Fold wet into dry until just combined (lumps ok).\n4. Rest batter 5 min.\n5. Cook on a buttered pan over medium heat 2-3 min per side.\n6. Serve with maple syrup and butter.',
    category: 'breakfast', cookTime: '20 min',
    image: 'https://i.pinimg.com/1200x/86/d9/fd/86d9fdf63112a5d812f3af9d1c479fed.jpg',
    createdAt: '2024-01-09T00:00:00.000Z',
  },
  {
    id: '10',
    title: 'Palak Paneer',
    description: 'Silky spinach curry with cubes of soft paneer. A north Indian classic packed with flavour.',
    Ingridients: '500g spinach\n250g paneer\n2 onions\n3 garlic cloves\n1 inch ginger\n2 green chilies\n1 tsp cumin\n1 tsp garam masala\n2 tbsp cream\nOil and salt',
    Instructions: '1. Blanch spinach and blend smooth.\n2. Fry onions, garlic, ginger until golden.\n3. Add spices and cook 1 min.\n4. Add spinach puree and simmer 10 min.\n5. Stir in cream.\n6. Add pan-fried paneer cubes and serve.',
    category: 'dinner', cookTime: '35 min',
    image: 'https://i.pinimg.com/736x/71/42/4b/71424b63165b74f2ce937c8fc0d4a640.jpg',
    createdAt: '2024-01-10T00:00:00.000Z',
  },
  {
    id: '11',
    title: 'Tiramisu',
    description: 'Classic Italian dessert with layers of mascarpone cream and espresso-soaked ladyfingers.',
    Ingridients: '300g mascarpone\n3 eggs, separated\n80g sugar\n250ml espresso, cooled\n200g ladyfingers\n2 tbsp Marsala wine\nCocoa powder',
    Instructions: '1. Whisk yolks and sugar until pale.\n2. Fold in mascarpone.\n3. Beat egg whites to stiff peaks, fold in.\n4. Dip ladyfingers in espresso briefly.\n5. Layer biscuits then cream in a dish.\n6. Repeat layers, dust with cocoa, and chill 4 hours.',
    category: 'desserts', cookTime: '20 min',
    image: 'https://i.pinimg.com/736x/74/f2/5e/74f25ed1eeadfb8efdca33ee02dac213.jpg',
    createdAt: '2024-01-11T00:00:00.000Z',
  },
  {
    id: '12',
    title: 'Chicken Caesar Salad',
    description: 'Crispy romaine, parmesan, croutons and grilled chicken with a tangy Caesar dressing.',
    Ingridients: '2 chicken breasts\n1 romaine lettuce\n50g parmesan\nCroutons\n3 tbsp Caesar dressing\n1 tsp Worcestershire sauce\nLemon juice\nBlack pepper',
    Instructions: '1. Season and grill chicken 6 min per side. Rest and slice.\n2. Tear romaine into large pieces.\n3. Toss lettuce with Caesar dressing.\n4. Top with chicken, croutons, and shaved parmesan.\n5. Finish with lemon juice and black pepper.',
    category: 'lunch', cookTime: '25 min',
    image: 'https://i.pinimg.com/1200x/56/bb/50/56bb506920f4337350de4aa6e509762e.jpg',
    createdAt: '2024-01-12T00:00:00.000Z',
  },
  {
    id: '13',
    title: 'Banana Bread',
    description: "Moist, tender banana bread with walnuts. Perfect for overripe bananas you can't throw away.",
    Ingridients: '3 ripe bananas\n80g butter, melted\n150g sugar\n1 egg\n1 tsp vanilla\n1 tsp baking soda\nPinch of salt\n190g flour\n60g walnuts',
    Instructions: '1. Preheat oven to 175°C.\n2. Mash bananas in a large bowl.\n3. Stir in melted butter.\n4. Mix in sugar, egg, and vanilla.\n5. Add baking soda, salt, and flour. Fold in walnuts.\n6. Bake in a loaf tin for 60-65 min.',
    category: 'breakfast', cookTime: '75 min',
    image: 'https://i.pinimg.com/1200x/62/c3/80/62c380eab68795bcd144628adfaf8b31.jpg',
    createdAt: '2024-01-13T00:00:00.000Z',
  },
  {
    id: '14',
    title: 'Tom Yum Soup',
    description: 'Bold, spicy Thai broth with prawns, mushrooms, lemongrass, and kaffir lime. Deeply aromatic.',
    Ingridients: '400g prawns\n200g mushrooms\n2 stalks lemongrass\n4 kaffir lime leaves\n3 Thai chilies\n2 tbsp fish sauce\n1 tbsp lime juice\n1 tsp sugar\n1L chicken stock\nCoriander',
    Instructions: '1. Bring stock to a boil with lemongrass and lime leaves.\n2. Add chilies and mushrooms. Simmer 5 min.\n3. Add prawns and cook 3 min.\n4. Season with fish sauce, lime, and sugar.\n5. Taste and adjust.\n6. Garnish with coriander and serve hot.',
    category: 'dinner', cookTime: '25 min',
    image: 'https://i.pinimg.com/1200x/76/ad/b6/76adb60c5f4befa1127331c35b89456e.jpg',
    createdAt: '2024-01-14T00:00:00.000Z',
  },
  {
    id: '15',
    title: 'Strawberry Smoothie',
    description: 'Thick, vibrant strawberry smoothie blended with banana and yogurt. Ready in 5 minutes.',
    Ingridients: '200g frozen strawberries\n1 banana\n150g Greek yogurt\n120ml milk\n1 tbsp honey\nIce cubes',
    Instructions: '1. Add all ingredients to blender.\n2. Blend on high for 60 seconds.\n3. Add more milk if too thick.\n4. Taste and adjust sweetness.\n5. Pour into tall glasses and serve immediately.',
    category: 'drinks', cookTime: '5 min',
    image: 'https://i.pinimg.com/1200x/e4/8d/dd/e48ddd7fd96aeb17eaafdb080362f5aa.jpg',
    createdAt: '2024-01-15T00:00:00.000Z',
  },
  {
    id: '16',
    title: 'Masala Dosa',
    description: 'Crispy South Indian crepe filled with spiced potato masala, served with chutneys and sambar.',
    Ingridients: '2 cups dosa batter\n4 potatoes, boiled\n2 onions\n1 tsp mustard seeds\n10 curry leaves\n1 tsp turmeric\n2 green chilies\nOil\nSalt',
    Instructions: '1. Mash potatoes roughly.\n2. Fry mustard seeds, curry leaves, onions.\n3. Add turmeric and chilies. Cook 2 min.\n4. Mix in potatoes and season.\n5. Spread dosa batter thin on a hot tawa.\n6. Add filling, fold, and serve with chutney.',
    category: 'breakfast', cookTime: '30 min',
    image: 'https://i.pinimg.com/736x/2b/35/43/2b3543cf136127e86cffce7c835b5a61.jpg',
    createdAt: '2024-01-16T00:00:00.000Z',
  },
  {
    id: '17',
    title: 'Margherita Pizza',
    description: 'Thin crust pizza with San Marzano tomato sauce, fresh mozzarella, and basil. The original.',
    Ingridients: 'Pizza dough (1 ball)\n150ml tomato sauce\n200g fresh mozzarella\nFresh basil\n2 tbsp olive oil\nSalt and pepper',
    Instructions: '1. Preheat oven to 250°C with a pizza stone.\n2. Stretch dough thin.\n3. Spread tomato sauce leaving a border.\n4. Tear mozzarella and place evenly.\n5. Bake 8-10 min until crust is charred.\n6. Add fresh basil and olive oil before serving.',
    category: 'dinner', cookTime: '20 min',
    image: 'https://i.pinimg.com/1200x/87/d3/dc/87d3dc0225d21869daf72e1f9a198ba4.jpg',
    createdAt: '2024-01-17T00:00:00.000Z',
  },
  {
    id: '18',
    title: 'Guacamole & Tortilla Chips',
    description: 'Chunky fresh guacamole with ripe avocados, lime, jalapeño, and coriander. Party staple.',
    Ingridients: '3 ripe avocados\n1 lime\n1 jalapeño\n1/2 red onion\n2 tbsp coriander\n1 tomato, deseeded\nSalt\nTortilla chips to serve',
    Instructions: '1. Halve and stone avocados. Scoop into bowl.\n2. Mash to desired consistency.\n3. Finely dice onion, jalapeño, tomato, coriander.\n4. Mix into avocado.\n5. Season with lime juice and salt.\n6. Serve immediately with chips.',
    category: 'snacks', cookTime: '10 min',
    image: 'https://i.pinimg.com/1200x/fc/3a/9e/fc3a9ecfed9619fbe6f68bdf2c729d97.jpg',
    createdAt: '2024-01-18T00:00:00.000Z',
  },
  {
    id: '19',
    title: 'Chole Bhature',
    description: 'Spiced chickpea curry served with puffed deep-fried bread. A north Indian street food legend.',
    Ingridients: '400g chickpeas (canned)\n2 onions\n3 tomatoes\n2 tsp chole masala\n1 tsp cumin\n1 inch ginger\nBhature dough (flour, yogurt, oil)\nOil\nSalt',
    Instructions: '1. Blend onions, tomatoes, and ginger.\n2. Cook masala in oil until thick.\n3. Add chickpeas with water. Simmer 20 min.\n4. Roll bhature dough into ovals.\n5. Deep fry until puffed and golden.\n6. Serve chole with hot bhature and pickled onions.',
    category: 'lunch', cookTime: '50 min',
    image: 'https://i.pinimg.com/736x/c2/b6/15/c2b6150e597a74fded37249b0a6448f9.jpg',
    createdAt: '2024-01-19T00:00:00.000Z',
  },
  {
    id: '20',
    title: 'Crème Brûlée',
    description: 'Silky vanilla custard with a perfectly caramelised sugar crust. The crown jewel of French desserts.',
    Ingridients: '500ml heavy cream\n1 vanilla pod\n6 egg yolks\n100g sugar\n4 tbsp extra sugar for topping',
    Instructions: '1. Preheat oven to 150°C.\n2. Heat cream with vanilla pod until steaming.\n3. Whisk yolks and sugar until pale.\n4. Pour hot cream slowly into yolks, whisking.\n5. Strain into ramekins, bake in water bath 40 min.\n6. Chill. Sprinkle sugar and blowtorch until amber.',
    category: 'desserts', cookTime: '60 min',
    image: 'https://i.pinimg.com/736x/30/08/e0/3008e04d0dccdbce38b13b15b8228abb.jpg',
    createdAt: '2024-01-20T00:00:00.000Z',
  },
]

// Set of default recipe IDs — used to separate user-created from built-in
const DEFAULT_IDS = new Set(defaultRecipes.map((r) => r.id))

export const RecipesProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      // Only pull USER-CREATED recipes from localStorage (ids not in defaults)
      const stored = localStorage.getItem('user_recipes')
      const userRecipes = stored ? JSON.parse(stored).filter((r) => !DEFAULT_IDS.has(r.id)) : []
      // Always use fresh defaultRecipes from code + append user recipes
      return [...defaultRecipes, ...userRecipes]
    } catch (_) {
      return defaultRecipes
    }
  })

  // Custom setData: split into defaults (ignored for storage) and user recipes
  const setDataAndPersist = (newData) => {
    setData(newData)
    // Only save user-created recipes to localStorage
    const userOnly = newData.filter((r) => !DEFAULT_IDS.has(r.id))
    localStorage.setItem('user_recipes', JSON.stringify(userOnly))
  }

  return (
    <recepiecontext.Provider value={{ data, setData: setDataAndPersist }}>
      {children}
    </recepiecontext.Provider>
  )
}

export default RecipesProvider