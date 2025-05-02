import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";

// Mock favorite services data
const favoriteServices = [
  {
    id: "1",
    name: "Weekly House Cleaning",
    provider: "CleanPro Services",
    description: "Thorough cleaning of your entire home including floors, kitchen, bathrooms, and dusting.",
    image: "/placeholder.svg",
    rating: 4.8,
    price: "$120",
    category: "Cleaning"
  },
  {
    id: "2",
    name: "Lawn Maintenance",
    provider: "Green Gardens",
    description: "Complete lawn care including mowing, edging, and debris removal.",
    image: "/placeholder.svg",
    rating: 4.7,
    price: "$60",
    category: "Gardening"
  },
  {
    id: "3",
    name: "Hair Styling",
    provider: "Elegant Salon",
    description: "Professional hair styling services including cut, color, and styling.",
    image: "/placeholder.svg",
    rating: 4.9,
    price: "$85",
    category: "Beauty"
  },
  {
    id: "4",
    name: "Computer Repair",
    provider: "Tech Solutions",
    description: "Expert computer repair services for all major brands.",
    image: "/placeholder.svg",
    rating: 4.6,
    price: "$75",
    category: "Tech"
  }
];

const FavoriteServices = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Favorite Services</h2>
        <p className="text-gray-600">Services you've saved for quick access</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteServices.map((service) => (
          <Card key={service.id} className="overflow-hidden flex flex-col">
            <div className="h-48 relative">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/50 backdrop-blur-sm hover:bg-white/80 text-red-500"
              >
                <Heart className="h-5 w-5 fill-red-500" />
              </Button>
              <div className="absolute bottom-2 left-2 bg-white/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                {service.category}
              </div>
            </div>
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
              <CardDescription>{service.provider}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{service.rating}</span>
                </div>
                <span className="font-medium">{service.price}</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="flex-1">
                Book Now
              </Button>
              <Button variant="outline" className="flex-1">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FavoriteServices;