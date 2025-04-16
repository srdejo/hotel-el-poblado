import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import { useParams } from "react-router";
  import roomsDataJson from "../../infrastructure/data/rooms.json";
  import { useState } from "react";
  import { Room } from "../../domain/model/Room";
  
  type Guest = {
    name: string;
    document: string;
  };
  
  export default function NewStayPage() {
    const { id } = useParams();
    const room = (roomsDataJson as Room[]).find((r) => r.id === id);
  
    const [guests, setGuests] = useState<Guest[]>([{ name: "", document: "" }]);
    const [nightlyRate, setNightlyRate] = useState(0);
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [addFeatures, setAddFeatures] = useState({
      airConditioning: false,
      jacuzzi: false,
    });
  
    if (!room) return <Typography>Habitación no encontrada</Typography>;
  
    const handleGuestChange = (index: number, field: "name" | "document", value: string) => {
      const updated = [...guests];
      updated[index][field] = value;
      setGuests(updated);
    };
  
    const addGuest = () => {
      setGuests([...guests, { name: "", document: "" }]);
    };
  
    const handleSubmit = () => {
      const stay = {
        roomId: room.id,
        guests,
        nightlyRate,
        checkInDate,
        checkOutDate,
        selectedExtras: {
          airConditioning: addFeatures.airConditioning,
          jacuzzi: addFeatures.jacuzzi,
        },
      };
  
      console.log("Estadía registrada:", stay);
      // Aquí podrías guardar en localStorage o enviar a tu backend
    };
  
    return (
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          Nueva estadía - Habitación {room.id}
        </Typography>
  
        <Typography variant="subtitle1" gutterBottom>
          Características incluidas:
        </Typography>
        <ul>
          {room.airConditioning && <li>Aire acondicionado</li>}
          {room.balconyView && <li>Vista con balcón</li>}
          {room.jacuzzi && <li>Jacuzzi</li>}
        </ul>
  
        <Stack spacing={2}>
          {guests.map((guest, index) => (
            <Stack direction="row" spacing={2} key={index}>
              <TextField
                label="Nombre"
                value={guest.name}
                onChange={(e) => handleGuestChange(index, "name", e.target.value)}
                fullWidth
              />
              <TextField
                label="Documento"
                value={guest.document}
                onChange={(e) =>
                  handleGuestChange(index, "document", e.target.value)
                }
                fullWidth
              />
            </Stack>
          ))}
  
          <Button onClick={addGuest}>Agregar huésped</Button>
  
          <TextField
            label="Valor por noche"
            type="number"
            value={nightlyRate}
            onChange={(e) => setNightlyRate(Number(e.target.value))}
            fullWidth
          />
  
          <FormControlLabel
            control={
              <Checkbox
                checked={addFeatures.airConditioning}
                onChange={(e) =>
                  setAddFeatures({
                    ...addFeatures,
                    airConditioning: e.target.checked,
                  })
                }
                disabled={room.airConditioning}
              />
            }
            label="Agregar aire acondicionado (+$20,000)"
          />
  
          <FormControlLabel
            control={
              <Checkbox
                checked={addFeatures.jacuzzi}
                onChange={(e) =>
                  setAddFeatures({
                    ...addFeatures,
                    jacuzzi: e.target.checked,
                  })
                }
                disabled={room.jacuzzi}
              />
            }
            label="Agregar jacuzzi (+$30,000)"
          />
  
          <Stack direction="row" spacing={2}>
            <TextField
              label="Fecha de ingreso"
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Fecha de salida"
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
  
          <Button variant="contained" onClick={handleSubmit}>
            Registrar estadía
          </Button>
        </Stack>
      </Box>
    );
  }
  