import GameForm from '../../../../components/game/GameForm';
import { useAuth } from '../../../../utils/context/authContext';

function EditGame() {
  const { user } = useAuth();
  return (
    <div>
      <h2>Edit Game Details</h2>
      <GameForm user={user} />
    </div>
  );
}

export default EditGame;
