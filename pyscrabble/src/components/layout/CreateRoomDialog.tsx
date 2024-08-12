import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/Dialog.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface CreateRoomDialogProps {
    button: React.ReactNode
}

const CreateRoomDialog: React.FC<CreateRoomDialogProps> = ({button}) => {
    const [lobbyName, setLobbyName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLobbyName(lobbyName);
        axios.post('http://localhost:3000/api/room/createLobby', {
            lobby_code: lobbyName
        }, { withCredentials: true })
        .then((response) => {
            const { player } = response.data;
            navigate(`/lobby/?code=${lobbyName}`, {
                state: {
                    code: lobbyName,
                    playerName: player.name,
                    playerScore: player.score
                }
            });
        })
        .catch((error) => {
            alert("Room already exists");
        });
    }   
    return (
        <Dialog>
            <DialogTrigger asChild>
                {button}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create your Lobby!</DialogTitle>
                    </DialogHeader>
                    <div className="flex w-full">
                        <Input
                            id="lobby-code"
                            placeholder="Lobby Name (Ex: AISP)"
                            className="col-span-3 w-full"
                            maxLength={4}
                            value={lobbyName}
                            onChange={(e) => setLobbyName(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" >Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateRoomDialog;