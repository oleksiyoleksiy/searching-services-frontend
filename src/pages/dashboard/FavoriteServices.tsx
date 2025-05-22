import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Company, Service } from "@/types";
import favoriteService from "@/services/favoriteService";
import BookingModal from "@/components/BookingModal";
import serviceService from "@/services/serviceService";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/ui/loader";

interface FavoriteService extends Company {
  is_favorite: boolean;
}

const FavoriteServices = () => {
  const [favorites, setFavorites] = useState<FavoriteService[]>([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<FavoriteService>();
  const [services, setServices] = useState<Service[]>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  const fetchFavorites = async () => {
    const response = await favoriteService.index();
    if (response) {
      setFavorites(response.map(f => ({ ...f, is_favorite: true })));
    }
  };

  const handleSaveButtonClick = async (id: string) => {
    try {
      const response = await favoriteService.store(Number(id));
      if (response) {
        setFavorites(prev =>
          prev.map(f =>
            f.id === id ? { ...f, is_favorite: !f.is_favorite } : f
          )
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleBookNowButtonClick = (provider: FavoriteService) => {
    setSelectedProvider(provider);
    setBookingModalOpen(true);
  };

  useEffect(() => {
    fetchFavorites().finally(() => setIsLoading(false))
  }, []);

  const fetchServices = async () => {
    if (selectedProvider?.id) {
      const response = await serviceService.index(Number(selectedProvider.id));
      if (response) {
        setServices(response);
      }
    }
  }

  useEffect(() => {
    if (bookingModalOpen && selectedProvider) {
      fetchServices();
    }
  }, [bookingModalOpen, selectedProvider]);

  if (isLoading) return <Loader />

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Favorite Services</h2>
        <p className="text-gray-600">Services you've saved for quick access</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(provider => (
          <Card key={provider.id} className="overflow-hidden flex flex-col">
            <div className="h-48 relative">
              <img
                src={provider.image}
                alt={provider.name}
                className="w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/50 backdrop-blur-sm hover:bg-white/80 text-red-500"
                onClick={() => handleSaveButtonClick(provider.id)}
              >
                {provider.is_favorite ? (
                  <Heart className="h-5 w-5 fill-red-500" />
                ) : (
                  <Heart className="h-5 w-5" />
                )}
              </Button>
              <div className="absolute bottom-2 left-2 bg-white/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                {provider.categories.map(c => c.name).join(" · ")}
              </div>
            </div>
            <CardHeader>
              <CardTitle>{provider.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 line-clamp-2">
                {provider.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{provider.rating}</span>
                </div>
                <span className="font-medium">{provider.price}</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              {!provider.is_owner && <Button
                className="flex-1"
                onClick={() => handleBookNowButtonClick(provider)}
              >
                Book Now
              </Button>}
              <Button onClick={() => navigate(`/provider/${provider.id}`)} variant="outline" className="flex-1">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <BookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        providerId={selectedProvider?.id ? String(selectedProvider.id) : ""}
        services={services}
        providerName={selectedProvider?.name || ""}
      />
    </div>
  );
};

export default FavoriteServices;
