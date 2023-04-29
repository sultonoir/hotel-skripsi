"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RentInput from "../Inputs/RentInput";
interface AdminTabsProps {
  listings: any;
}

const AdminTabs: React.FC<AdminTabsProps> = ({ listings }) => {
  return (
    <Tabs defaultValue="Reservation">
      <TabsList>
        <TabsTrigger value="Reservation">Reservation</TabsTrigger>
        <TabsTrigger value="Properties">Properties</TabsTrigger>
      </TabsList>
      <TabsContent value="Reservation"></TabsContent>
      <TabsContent value="Properties">
        <RentInput listings={listings} />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
