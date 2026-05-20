export const ROOMS = {
  kitchen: {
    name: "Kitchen",
    icon: "fa-kitchen-set",
    desc: "Modern functional space with high durability needs.",
    grad: "linear-gradient(135deg,#fdf3e7,#fde8c8)",
    iconColor: "#c9a96e",
  },
  bathroom: {
    name: "Bathroom",
    icon: "fa-bath",
    desc: "Water-resistant materials and serene atmosphere.",
    grad: "linear-gradient(135deg,#e8f4f8,#cce8f4)",
    iconColor: "#60a5c4",
  },
  living: {
    name: "Living Room",
    icon: "fa-couch",
    desc: "Comfortable and welcoming social space.",
    grad: "linear-gradient(135deg,#edf5ed,#c8e6c9)",
    iconColor: "#5a9e6f",
  },
  bedroom: {
    name: "Bedroom",
    icon: "fa-bed",
    desc: "Restful and personal sanctuary.",
    grad: "linear-gradient(135deg,#f3eef8,#e2d1f5)",
    iconColor: "#9c6ebe",
  },
  laundry: {
    name: "Laundry Room",
    icon: "fa-shirt",
    desc: "Practical and efficient utility space.",
    grad: "linear-gradient(135deg,#f0f0f0,#dde0e3)",
    iconColor: "#8a9199",
  },
};

export const OPTIONS = {
  kitchen: [
    { category: "Flooring",  items: ["Porcelain Tile", "Vinyl", "Hardwood", "Concrete"] },
    { category: "Benchtop",  items: ["Granite", "Quartz", "Marble", "Laminate"] },
    { category: "Cabinetry", items: ["Matte White", "Oak", "Navy Blue", "Walnut"] },
    { category: "Lighting",  items: ["Recessed LED", "Pendant Lights", "Under-cabinet"] },
  ],
  bathroom: [
    { category: "Flooring",    items: ["Ceramic Tile", "Porcelain", "Vinyl"] },
    { category: "Wall Finish", items: ["Ceramic Tile", "Paint", "Marble"] },
    { category: "Vanity",      items: ["Floating White", "Wooden", "Black Matte"] },
    { category: "Lighting",    items: ["Vanity Lights", "Ceiling LED"] },
  ],
  living: [
    { category: "Flooring", items: ["Hardwood", "Carpet", "Tile"] },
    { category: "Sofa",     items: ["Grey Linen", "Leather", "Blue Velvet"] },
    { category: "Table",    items: ["Coffee Table - Oak", "Glass"] },
    { category: "Lighting", items: ["Floor Lamp", "Ceiling Light"] },
  ],
  bedroom: [
    { category: "Flooring",    items: ["Carpet", "Hardwood"] },
    { category: "Bed",         items: ["King Bed - Oak", "Upholstered"] },
    { category: "Wall Finish", items: ["Soft Grey Paint", "Accent Wall"] },
    { category: "Lighting",    items: ["Bedside Lamps", "Ceiling Fan Light"] },
  ],
  laundry: [
    { category: "Flooring",  items: ["Vinyl", "Tile"] },
    { category: "Cabinetry", items: ["White Melamine", "Utility Shelving"] },
    { category: "Counter",   items: ["Laminate", "Stainless"] },
  ],
};
