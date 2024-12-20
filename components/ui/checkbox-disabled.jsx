import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function CheckboxDisabled({ warning }) {
  return (
    <div className="flex items-center space-x-2">
      <HoverCard>
        <HoverCardTrigger>
          {" "}
          <Checkbox id="terms2" disabled />
        </HoverCardTrigger>
        <HoverCardContent>
          {warning}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
