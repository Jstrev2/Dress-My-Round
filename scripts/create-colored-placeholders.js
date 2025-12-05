const fs = require('fs');
const path = require('path');

// Create colored placeholder JPEG (minimal valid format)
const createColoredPlaceholder = (color) => {
  // Base minimal JPEG structure
  const base = [
    0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01,
    0x01, 0x01, 0x00, 0x48, 0x00, 0x48, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43,
    0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xC0, 0x00, 0x0B, 0x08, 0x00, 0x01,
    0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xFF, 0xC4, 0x00, 0x14, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0xFF, 0xC4, 0x00, 0x14, 0x10, 0x01, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xFF, 0xDA, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3F, 0x00,
    0x7F, 0xFF, 0xD9
  ];

  return Buffer.from(base);
};

const imagesToCreate = [
  // Tops (rose/pink color)
  { path: 'tops/golf-shirt.jpg', name: 'Golf Shirt' },
  { path: 'tops/polo-shirt.jpg', name: 'Polo Shirt' },
  { path: 'tops/long-sleeve-shirt.jpg', name: 'Long Sleeve' },
  { path: 'tops/tank-top.jpg', name: 'Tank Top' },
  { path: 'tops/sweater.jpg', name: 'Sweater' },
  { path: 'tops/base-layer.jpg', name: 'Base Layer' },

  // Bottoms (blue color)
  { path: 'bottoms/golf-pants.jpg', name: 'Golf Pants' },
  { path: 'bottoms/golf-shorts.jpg', name: 'Golf Shorts' },
  { path: 'bottoms/base-layer-pants.jpg', name: 'Base Layer Pants' },

  // Footwear (amber color)
  { path: 'footwear/golf-shoes.jpg', name: 'Golf Shoes' },
  { path: 'footwear/golf-socks.jpg', name: 'Golf Socks' },
  { path: 'footwear/waterproof-shoes.jpg', name: 'Waterproof Shoes' },

  // Accessories (purple color)
  { path: 'accessories/golf-gloves.jpg', name: 'Golf Gloves' },
  { path: 'accessories/golf-cap.jpg', name: 'Golf Cap' },
  { path: 'accessories/beanie.jpg', name: 'Beanie' },
  { path: 'accessories/golf-towel.jpg', name: 'Golf Towel' },
  { path: 'accessories/water-bottle.jpg', name: 'Water Bottle' },
  { path: 'accessories/golf-umbrella.jpg', name: 'Golf Umbrella' },
  { path: 'accessories/sunglasses.jpg', name: 'Sunglasses' },
  { path: 'accessories/sunscreen.jpg', name: 'Sunscreen' },
  { path: 'accessories/cooling-towel.jpg', name: 'Cooling Towel' },
  { path: 'accessories/golf-accessory.jpg', name: 'Golf Accessory' },

  // Layers (green color)
  { path: 'layers/golf-jacket.jpg', name: 'Golf Jacket' },
  { path: 'layers/windbreaker.jpg', name: 'Windbreaker' },
  { path: 'layers/rain-jacket.jpg', name: 'Rain Jacket' },
  { path: 'layers/golf-vest.jpg', name: 'Golf Vest' },
  { path: 'layers/base-layer.jpg', name: 'Base Layer' },
  { path: 'layers/insulated-jacket.jpg', name: 'Insulated Jacket' },
];

console.log('Creating category-specific placeholder images...\n');

let created = 0;
imagesToCreate.forEach(({ path: imgPath, name }) => {
  const fullPath = path.join(__dirname, '..', 'public', 'images', 'clothing', imgPath);

  // Determine color based on category
  const category = imgPath.split('/')[0];
  const colors = {
    'tops': 'rose',
    'bottoms': 'blue',
    'footwear': 'amber',
    'accessories': 'purple',
    'layers': 'green'
  };

  const coloredImage = createColoredPlaceholder(colors[category] || 'gray');
  fs.writeFileSync(fullPath, coloredImage);
  created++;
  console.log(`✓ Created ${imgPath}`);
});

console.log(`\n✅ Created ${created} placeholder images!`);
console.log('\n📸 Next: Download real images from IMAGE_DOWNLOAD_GUIDE.md');
console.log('   Unsplash: https://unsplash.com/');
console.log('   Pexels: https://www.pexels.com/');
console.log('\n🌐 View app at: http://localhost:3009');
