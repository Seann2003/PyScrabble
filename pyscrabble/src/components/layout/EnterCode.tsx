import React, { useState } from 'react';
import { Button } from "../ui/Button.tsx"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog.tsx"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input } from "../ui/Input.tsx"

export default function EnterCode() {
  const [lobbyCode, setLobbyCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/apiRoom/checkRoom`, {lobby_code: lobbyCode}, { withCredentials: true });
      if (response.status === 200) {   
        
        navigate(`/lobby/?code=${lobbyCode}`);
      }else{
        alert("Incorrect Lobby Code")
      }
    } catch (error) {
      alert("Incorrect Lobby Code")
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full'>ENTER CODE</Button>
      </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>

          <DialogHeader>
            <DialogTitle>Enter your lobby code</DialogTitle>
          </DialogHeader>
          <div className="flex w-full">
            <Input
              id="lobby-code"
              value={lobbyCode} // Ensure the input value is controlled
              placeholder="#AISP"
              className="col-span-3 w-full"
              onChange={(e) => setLobbyCode(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Join</Button>
          </DialogFooter>
        </form>

        </DialogContent>
    </Dialog>
  );
}
