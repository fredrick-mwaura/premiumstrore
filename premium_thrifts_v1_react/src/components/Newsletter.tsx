import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section className="bg-muted py-16">
      <div className="container max-w-4xl text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
        <p className="text-muted-foreground mb-8">
          Subscribe to receive updates about new arrivals and special offers
        </p>
        <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
};