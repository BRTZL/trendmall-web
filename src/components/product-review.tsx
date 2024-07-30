import { faker } from "@faker-js/faker"
import { StarIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProductReview() {
  const name = faker.person.fullName()
  const initials = name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)

  const review = faker.lorem.paragraph()

  return (
    <div className="flex gap-4">
      <Avatar className="size-10 border">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{name}</h3>
          <div className="flex items-center gap-0.5">
            <StarIcon className="size-5 fill-primary" />
            <StarIcon className="size-5 fill-primary" />
            <StarIcon className="size-5 fill-primary" />
            <StarIcon className="size-5 fill-muted stroke-muted-foreground" />
            <StarIcon className="size-5 fill-muted stroke-muted-foreground" />
          </div>
        </div>
        <p className="text-muted-foreground">{review}</p>
      </div>
    </div>
  )
}
