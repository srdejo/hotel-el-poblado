import { Box, Typography, Stack, Divider } from "@mui/material";
import { GuestStay } from "../../domain/model/GuestStay";

type Props = {
  stay: GuestStay;
};

export default function Stay({ stay }: Props) {
  return (
    <Box mt={1}>
      <Typography variant="body2" fontWeight="bold" color="text.primary">
        Estadía del {stay.checkInDate.toLocaleDateString()} al {stay.checkOutDate.toLocaleDateString()} ({stay.nights} noche{stay.nights > 1 ? "s" : ""})
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Total: ${stay.total.toLocaleString()}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Pagado: ${stay.paid.toLocaleString()}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Pendiente: ${stay.balance.toLocaleString()}
      </Typography>

      <Divider sx={{ my: 1 }} />

      {stay.payments.length > 0 && (
        <>
          <Typography variant="subtitle2" gutterBottom>
            Pagos
          </Typography>
          <Stack spacing={0.5}>
            {stay.payments.map((p) => (
              <Typography key={p.id} variant="body2" color="text.secondary">
                ${p.amount.toLocaleString()} - {p.method} ({new Date(p.date).toLocaleDateString()})
              </Typography>
            ))}
          </Stack>
        </>
      )}

      {stay.penalties.length > 0 && (
        <>
          <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>
            Multas
          </Typography>
          <Stack spacing={0.5}>
            {stay.penalties.map((p, i) => (
              <Typography key={i} variant="body2" color="error.main">
                {p.description} - ${p.amount.toLocaleString()}
              </Typography>
            ))}
          </Stack>
        </>
      )}

      {stay.comments && stay.comments.length > 0 && (
        <>
          <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>
            Comentarios
          </Typography>
          <Stack spacing={0.5}>
            {stay.comments.map((c, i) => (
              <Typography key={i} variant="body2" color="text.secondary">
                📝 {c}
              </Typography>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
}
