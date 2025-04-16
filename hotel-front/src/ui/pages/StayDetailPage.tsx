import staysDataJson from "../../infrastructure/data/stays.json";
import roomsDataJson from "../../infrastructure/data/rooms.json";

import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import { GuestStay } from "../../domain/model/GuestStay";
import { Room } from "../../domain/model/Room";

export default function StayDetailPage() {
  
  const { id } = useParams(); 
  const stay = (staysDataJson as any[]).map(GuestStay.fromJson).find((s) => s.id === id);
  const room = (roomsDataJson as Room[]).find(r => r.id === stay?.roomId)

  if (!stay || !room) {
    return <Typography>Estadía no encontrada.</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Detalle de Estadía – Habitación {stay.roomId}
      </Typography>

      <Grid container spacing={4}>
        {/* Columna izquierda: Info general */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="body1" gutterBottom>
            {room?.description}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            {room?.doubleBed && (
              <Chip label={`${room?.doubleBed} cama(s) doble`} />
            )}
            {room?.singleBed && (
              <Chip label={`${room?.singleBed} cama(s) sencilla`} />
            )}
            {room?.bunkBed && <Chip label={`${room?.bunkBed} camarote(s)`} />}
            {room?.airConditioning && (
              <Chip label="Aire acondicionado" color="primary" />
            )}
            {room?.balconyView && <Chip label="Vista al mirador" />}
            {room?.jacuzzi && <Chip label="Jacuzzi" />}
          </Stack>

          <Typography variant="h6" gutterBottom>
            Estadía
          </Typography>
          <Typography>
            Del {stay.checkInDate.toLocaleDateString()} al{" "}
            {stay.checkOutDate.toLocaleDateString()} ({stay.nights} noche
            {stay.nights > 1 ? "s" : ""})
          </Typography>
          <Typography>
            Valor por noche: ${stay.nightlyRate.toLocaleString()}
          </Typography>

          {stay.additionalCharges.length > 0 && (
            <>
              <Typography variant="subtitle1" mt={2}>
                Cargos adicionales
              </Typography>
              {stay.additionalCharges.map((c, i) => (
                <Typography key={i}>
                  • {c.description}: ${c.amount.toLocaleString()}
                </Typography>
              ))}
            </>
          )}

          {stay.comments?.length > 0 && (
            <>
              <Typography variant="subtitle1" mt={2}>
                Comentarios
              </Typography>
              <Stack spacing={0.5}>
                {stay.comments.map((c, i) => (
                  <Typography key={i}>📝 {c}</Typography>
                ))}
              </Stack>
            </>
          )}
        </Grid>

        {/* Columna derecha: Resumen y pagos */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            p={2}
            sx={{
              backgroundColor: "#fafafa",
              borderRadius: 2,
              boxShadow: 1,
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Resumen
            </Typography>
            <Typography>Total: ${stay.total}</Typography>
            <Typography>Pagado: ${stay.completedayments}</Typography>
            <Typography color="error">
              Pendiente: ${stay.pendingPayments}{" "}
            </Typography>

            {stay.payments.length > 0 && (
              <>
                <Typography variant="subtitle1" mt={2}>
                  Movimientos
                </Typography>
                <Stack spacing={1}>
                  {stay.payments.map((p) => {
                    console.log(stay);
                    if (p.status === "pending") {
                      return (
                        <Typography key={p.id} color="error">
                          ${p.amount.toLocaleString()} – {p.method} (
                          {new Date(p.date).toLocaleDateString()}) -{" "}
                          {p.description}
                        </Typography>
                      );
                    } else {
                      return (
                        <Typography key={p.id}>
                          ${p.amount.toLocaleString()} – {p.method} (
                          {new Date(p.date).toLocaleDateString()}) -{" "}
                          {p.description}
                        </Typography>
                      );
                    }
                  })}
                </Stack>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
