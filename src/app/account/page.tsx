import { redirect } from "next/navigation"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { LogoutButton } from "@/components/logout-button"

import { serverApi } from "@/lib/api"
import { isUserAuthenticated } from "@/lib/session"

import { AddressesList } from "./addresses-list"
import { PersonalInfoForm } from "./personal-info-form"

export default async function Account() {
  const isAuthenticated = await isUserAuthenticated()

  if (!isAuthenticated) {
    redirect("/login")
  }

  const user = await serverApi.v1.usersControllerGetMe()
  const orders = await serverApi.v1.ordersControllerFindAll()
  const addresses = await serverApi.v1.addressesControllerFindAll()

  return (
    <div className="relative">
      <LogoutButton />
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="border-b">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <div className="px-4 py-8 md:px-6">
            <h1 className="text-2xl font-bold">Orders</h1>
            <div className="mt-6 grid gap-6">
              {orders.data.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex flex-col space-y-1.5">
                      <CardTitle>Order #{order.id}</CardTitle>
                      <CardDescription>
                        Placed on{" "}
                        {format(
                          new Date(order.createdAt),
                          "LLLL d HH:mm, yyyy"
                        )}
                      </CardDescription>
                    </div>

                    <Badge className="capitalize">{order.status}</Badge>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.items.map((orderItem) => (
                          <TableRow key={orderItem.id}>
                            <TableCell>{orderItem.product.name}</TableCell>
                            <TableCell>{orderItem.quantity}</TableCell>
                            <TableCell>${orderItem.price / 100}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <div className="text-muted-foreground">
                      Total: ${order.total / 100}
                    </div>
                  </CardFooter>
                </Card>
              ))}

              {orders.data.length === 0 && (
                <EmptyPlaceholder>
                  <EmptyPlaceholder.Icon />
                  <EmptyPlaceholder.Title>
                    No orders found
                  </EmptyPlaceholder.Title>
                  <EmptyPlaceholder.Description>
                    You haven&apos;t placed any orders yet.
                  </EmptyPlaceholder.Description>
                </EmptyPlaceholder>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="addresses">
          <AddressesList addresses={addresses.data} />
        </TabsContent>
        <TabsContent value="account">
          <div className="px-4 py-8 md:px-6">
            <h1 className="text-2xl font-bold">Account Details</h1>
            <div className="mt-6 grid gap-6">
              <PersonalInfoForm user={user.data} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
