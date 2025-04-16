import roomsDataJson from "../../infrastructure/data/rooms.json";
import staysDataJson from "../../infrastructure/data/stays.json";
import { GuestStay } from "../../domain/model/GuestStay";
import RoomCard from "../components/RoomCard";
import type { Room } from "../../domain/model/Room";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router";

export function RoomsPage() {
  const roomsData = roomsDataJson as Room[];
  const stayData = (staysDataJson as any[]).map(GuestStay.fromJson);
  const navigate = useNavigate();

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2}>
            {roomsData.map((room) => {
              const stay = stayData.find((s) => s.roomId === room.id);
              if(stay){
                stay.room = room;
              }
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={room.id}>
                  <RoomCard
                    room={room}
                    stay={stay}
                    onRegistrarHuespedes={(id) => navigate(`/nueva/estadia/${id}`)}
                    onHospedajeOcasional={(id) =>
                      console.log("Hospedaje ocasional:", id)
                    }
                    onViewDetails={(id) => navigate(`/estadia/${id}`)}
                    onAddAditionalChargue={(id, desc, valor) =>
                      console.log("Cargo:", id, desc, valor)
                    }
                    onViewPayments={(id) => console.log("Pagos:", id)}
                    onAddComment={(id, comment) => console.log("Comment:", comment, "room", id)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
