export default function AddEditReservation ({ calledAPI, setCalledAPI }) {
  const [formData, setFormData] = useState({});

  function handleChange ({ target }) {
    setFormData(() => ({ ...formData, [target.name]: target.value }));
  }

  async function handleSubmit (event) {
    event.preventDefault();
    setErrors(null);
    const errorsArr = getDateErrors();

    if (!errorsArr.length) {
      try {
        if (reservation_id) {
          await updateReservationDetails(formData, reservation_id);
        } else {
          await createReservation(formData);
        }

        setCalledAPI(!calledAPI);
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (error) {
        setErrors(error);
      }
    } else {
      const errorMessage = { message: `${errorsArr.join(', ').trim()}` };
      setErrors(errorMessage);
    }
  }

  return (
    <div>
      <h2>Reserve a Table</h2>
      <form name='create_reservation' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='first_name'>First Name</label>
          <input
            required
            type='text'
            name='first_name'
            value={formData.first_name}
            className='form-control'
            placeholder='John Q'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='last_name'>Last Name</label>
          <input
            required
            type='text'
            name='last_name'
            value={formData.last_name}
            className='form-control'
            placeholder='Public'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='mobile_number'>Mobile Number</label>
          <input
            required
            type='tel'
            name='mobile_number'
            value={FormData.mobile_number}
            className='form-control'
            placeholder='123-456-7890'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='reservation_date'>Date</label>
          <input
            required
            type='date'
            name='reservation_date'
            value={formData.reservation_date}
            className='form-control'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='reservation_time'>Time</label>
          <input
            required
            type='time'
            name='reservation_time'
            value={formData.reservation_time}
            className='form-control'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='people'>Number of People</label>
          <input
            required
            type='number'
            name='people'
            value={formData.people}
            className='form-control'
            placeholder='#'
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
        <button
          onClick={history.goBack}
          className='btn btn-secondary ml-1'
          type='button'
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
