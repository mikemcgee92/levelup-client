import EventForm from '../../../../components/event/EventForm';
import { useAuth } from '../../../../utils/context/authContext';

function EditEvent() {
  const { user } = useAuth();
  return (
    <div>
      <h2>Edit Event Details</h2>
      <EventForm user={user} />
    </div>
  );
}

export default EditEvent;
