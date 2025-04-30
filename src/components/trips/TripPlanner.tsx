
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plane, DollarSign, Users, MapPin, CalendarCheck, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import AnimatedButton from "@/components/ui/AnimatedButton";

const formSchema = z.object({
  destination: z.string().min(2, {
    message: "Please enter a valid destination.",
  }),
  startDate: z.date({
    required_error: "Please select a start date.",
  }),
  endDate: z.date({
    required_error: "Please select an end date.",
  }).optional(),
  category: z.string({
    required_error: "Please select a travel category.",
  }),
  travelWith: z.string({
    required_error: "Please select who you're traveling with.",
  }),
  budget: z.number({
    required_error: "Please set your budget.",
  }).min(500, {
    message: "Budget should be at least $500.",
  }),
  interests: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const travelCategories = [
  { value: "adventure", label: "Adventure" },
  { value: "beach", label: "Beaches" },
  { value: "cultural", label: "Cultural" },
  { value: "mountain", label: "Mountains & Hills" },
  { value: "temple", label: "Temples & Heritage" },
  { value: "wildlife", label: "Wildlife" },
  { value: "urban", label: "Urban Exploration" },
];

const travelWithOptions = [
  { value: "solo", label: "Solo" },
  { value: "couple", label: "Couple" },
  { value: "family", label: "Family" },
  { value: "friends", label: "Friends" },
  { value: "group", label: "Group" },
];

const TripPlanner = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("custom");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  const defaultValues: Partial<FormValues> = {
    budget: 1500,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    if (step < 3) {
      setStep(step + 1);
    } else {
      toast({
        title: "Trip Plan Created!",
        description: "Your personalized trip has been created successfully.",
      });
      setSubmitted(true);
    }
  };

  // Pre-defined trip plans
  const fixedPlans = [
    {
      id: "romantic-paris",
      title: "Romantic Paris Getaway",
      destination: "Paris, France",
      duration: "7 days",
      price: 2499,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      category: "Couple",
      description: "Experience the magic of Paris with your loved one. This carefully curated 7-day itinerary includes romantic dinners, scenic walks, and visits to iconic landmarks.",
    },
    {
      id: "bali-adventure",
      title: "Bali Adventure",
      destination: "Bali, Indonesia",
      duration: "10 days",
      price: 1899,
      image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80",
      category: "Adventure",
      description: "Discover the beauty and thrill of Bali with this 10-day adventure package. From stunning beaches to lush rainforests, this trip has it all.",
    },
    {
      id: "family-disney",
      title: "Family Disney Adventure",
      destination: "Orlando, USA",
      duration: "5 days",
      price: 3299,
      image: "https://images.unsplash.com/photo-1620843437920-ead942b3abd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80",
      category: "Family",
      description: "Create magical memories with your family at the world's most famous theme parks. This 5-day package includes park tickets, accommodations, and more.",
    },
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Where do you want to go?</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input placeholder="Enter destination" className="pl-9" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Travel Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {travelCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date (Optional)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value || undefined}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < (form.getValues().startDate || new Date())
                    }
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                If left blank, we'll suggest the optimal duration.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="flex justify-end">
        <AnimatedButton 
          type="button" 
          onClick={() => onSubmit(form.getValues())}
          className="group"
        >
          <span>Continue</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </AnimatedButton>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="travelWith"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who are you traveling with?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {travelWithOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Budget: ${field.value}</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-4">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <Slider
                    value={[field.value]}
                    min={500}
                    max={10000}
                    step={100}
                    onValueChange={(vals) => field.onChange(vals[0])}
                    className="flex-1"
                  />
                </div>
              </FormControl>
              <FormDescription>
                Set your budget to help us recommend suitable accommodations and activities.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="interests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Interests (Optional)</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., hiking, photography, local cuisine, historical sites"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Help us personalize your trip by sharing your interests.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setStep(1)}
        >
          Back
        </Button>
        <AnimatedButton 
          type="button" 
          onClick={() => onSubmit(form.getValues())}
          className="group"
        >
          <span>Continue</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </AnimatedButton>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-travel-50 dark:bg-travel-900/20 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium">Trip Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-travel-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Destination</p>
              <p className="font-medium">{form.getValues().destination || "Not specified"}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <CalendarCheck className="h-5 w-5 text-travel-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Dates</p>
              <p className="font-medium">
                {form.getValues().startDate ? format(form.getValues().startDate, "MMM d, yyyy") : "Not specified"}
                {form.getValues().endDate ? ` - ${format(form.getValues().endDate, "MMM d, yyyy")}` : ""}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Users className="h-5 w-5 text-travel-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Traveling With</p>
              <p className="font-medium">
                {travelWithOptions.find(option => option.value === form.getValues().travelWith)?.label || "Not specified"}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <DollarSign className="h-5 w-5 text-travel-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
              <p className="font-medium">${form.getValues().budget?.toLocaleString() || "Not specified"}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center py-4">
        <p className="text-gray-600 dark:text-gray-400">
          By clicking "Create Trip Plan", our system will generate a personalized itinerary based on your preferences.
        </p>
      </div>
      
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setStep(2)}
        >
          Back
        </Button>
        <AnimatedButton 
          type="submit"
          className="group"
        >
          <span>Create Trip Plan</span>
          <Plane className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </AnimatedButton>
      </div>
    </div>
  );

  const renderTripSuccess = () => (
    <div className="text-center space-y-6 py-8">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
        <svg
          className="w-10 h-10 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      
      <h3 className="text-2xl font-bold">Your Trip Plan is Ready!</h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        We've created a personalized trip plan based on your preferences. You can now view and customize your itinerary.
      </p>
      
      <div className="flex justify-center space-x-4 pt-4">
        <Button variant="outline">
          Share Plan
        </Button>
        <Button>
          View Itinerary
        </Button>
      </div>
    </div>
  );

  const renderFixedPlans = () => (
    <div className="space-y-8">
      <p className="text-gray-600 dark:text-gray-400 text-center">
        Choose from our curated trip plans designed by travel experts.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fixedPlans.map((plan) => (
          <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <img
                src={plan.image}
                alt={plan.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <div>
                  <span className="px-2 py-1 bg-travel-600 text-white text-xs rounded-full">
                    {plan.category}
                  </span>
                  <h3 className="text-white font-semibold mt-2">{plan.title}</h3>
                </div>
              </div>
            </div>
            
            <CardContent className="pt-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm">{plan.destination}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm">{plan.duration}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {plan.description}
              </p>
            </CardContent>
            
            <CardFooter className="flex justify-between items-center pt-0">
              <div className="text-travel-600 dark:text-travel-400 font-semibold">
                ${plan.price}
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs 
        defaultValue="custom" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="custom">Custom Trip</TabsTrigger>
          <TabsTrigger value="fixed">Fixed Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="custom">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Create Your Custom Trip</CardTitle>
              <CardDescription>
                Answer a few questions and we'll craft a personalized travel itinerary just for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!submitted ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                  </form>
                </Form>
              ) : (
                renderTripSuccess()
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fixed">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Expert-Curated Trip Plans</CardTitle>
              <CardDescription>
                Select from our carefully designed trip packages for a hassle-free planning experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderFixedPlans()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TripPlanner;
