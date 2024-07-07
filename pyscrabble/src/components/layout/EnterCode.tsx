import React from 'react';
import { Button } from "../../components/ui/Button.tsx"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog.tsx"
import { Input } from "../../components/ui/Input.tsx"

export default function EnterCode() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>ENTER CODE</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter your lobby code</DialogTitle>
        </DialogHeader>
        <div className="flex w-full i">
            <Input
              id="lobby-code"
              placeholder="#AISP"
              className="col-span-3 w-full"

            />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
