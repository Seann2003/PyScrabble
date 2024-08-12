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
import JoinGameLogo from '../../assets/buttonLogo/joingame-logo.svg'
import MenuButton from '../ui/MenuButton.tsx';



export default function EnterCodeShowdown() {
  const [lobbyCode, setLobbyCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/room/join/${lobbyCode}`, {}, { withCredentials: true });
      if (response.status === 200) {   
        setIsOpen(false);
        navigate(`/lobby/?code=${lobbyCode}`);
        alert(response.data.message)
      }else{
        alert("Incorrect Lobby Code")
      }
    } catch (error) {
      alert("Incorrect Lobby Code")
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
            <MenuButton 
                bgColor='bg-[#BB5C17]' 
                textColor='text-[#F7BD93]' 
                title='JOIN GAME!' 
                logoPath={JoinGameLogo} 
                logoDesc='Join Game logo'
                onClick={() => setIsOpen(true)}  
            />      
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
