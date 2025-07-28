import React, { useState } from "react";
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";

type Category = "Clothes" | "Shoes" | "Bags";
type SubCategory = "Men" | "Women" | "Children";

const SidebarFilter = () => {
  const [priceRange, setPriceRange] = useState([20, 500]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<SubCategory[]>([]);
  // const [expressDelivery, setExpressDelivery] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  // const [discountPercentage, setDiscountPercentage] = useState("");

  const categories: Category[] = ["Clothes", "Shoes", "Bags"];
  const subCategories: SubCategory[] = ["Men", "Women", "Children"];
  const fashionBrands = [
    "Nike", "Adidas", "Puma", "Gucci", "Zara",
    "H&M", "Calvin Klein", "Tommy Hilfiger"
  ];

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = Number(event.target.value);
    setPriceRange((prev) => {
      const newRange = [...prev];
      newRange[index] = value;
      return newRange;
    });
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const handleSubCategoryClick = (subCategory: SubCategory) => {
    setSelectedSubCategories(prev =>
      prev.includes(subCategory)
        ? prev.filter(cat => cat !== subCategory)
        : [...prev, subCategory]
    );
  };

  const handleBrandClick = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <aside className="bg-background p-4 gap-4 border rounded-lg shadow-md md:m-4 md:sticky md:top-4 md:max-h-[calc(100vh-2rem)] overflow-auto">
      {/* MAIN CATEGORIES */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">CATEGORIES</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <label className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryClick(category)}
                />
                <span className="text-sm">{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* SUB CATEGORIES */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">FOR</h3>
        <ul className="space-y-2">
          {subCategories.map((subCategory) => (
            <li key={subCategory}>
              <label className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedSubCategories.includes(subCategory)}
                  onCheckedChange={() => handleSubCategoryClick(subCategory)}
                />
                <span className="text-sm">{subCategory}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* EXPRESS DELIVERY */}
      {/* <div className="mb-6">
        <h4 className="font-semibold mb-3">DELIVERY</h4>
        <label className="flex items-center space-x-2">
          <Checkbox
            checked={expressDelivery}
            onCheckedChange={(checked) => setExpressDelivery(checked as boolean)}
          />
          <span className="text-sm">Express Delivery</span>
        </label>
      </div> */}

      {/* BRAND */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">BRANDS</h4>
        <Input
          type="text"
          placeholder="Search brands..."
          className="mb-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="space-y-2 max-h-32 overflow-y-auto">
          {fashionBrands
            .filter((brand) => brand.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((brand) => (
              <li key={brand}>
                <label className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandClick(brand)}
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              </li>
            ))}
        </ul>
      </div>

      {/* PRICE RANGE */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">PRICE ($)</h3>
        <div className="flex items-center gap-2 mb-3">
          <Input
            type="number"
            className="w-24"
            value={priceRange[0]}
            min={20}
            max={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 0)}
          />
          <span>-</span>
          <Input
            type="number"
            className="w-24"
            value={priceRange[1]}
            min={priceRange[0]}
            max={500}
            onChange={(e) => handlePriceChange(e, 1)}
          />
        </div>
      </div>

      {/* DISCOUNT */}
      {/* <div>
        <h3 className="font-semibold mb-3">DISCOUNT</h3>
        <div className="space-y-2">
          {["50% or more", "30% or more", "20% or more"].map((discount) => (
            <label key={discount} className="flex items-center space-x-2">
              <Checkbox
                checked={discountPercentage === discount}
                onCheckedChange={() => setDiscountPercentage(discount)}
              />
              <span className="text-sm">{discount}</span>
            </label>
          ))}
        </div> 
      </div>*/}
    </aside>
  );
};

export default SidebarFilter;