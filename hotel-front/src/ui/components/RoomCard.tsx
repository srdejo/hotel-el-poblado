import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
  Paper,
  Stack,
  Link,
} from "@mui/material";
import {
  LoginOutlined,
  TimelapseOutlined,
  LogoutOutlined,
  ListAltOutlined,
  AddCommentOutlined,
} from "@mui/icons-material";
import { Room } from "../../domain/model/Room";
import { RoomStatus } from "../../domain/model/RoomStatus";
import RoomFeatures from "./RoomFeatures";
import { GuestStay } from "../../domain/model/GuestStay";

type Props = {
  room: Room;
  stay?: GuestStay;
  onRegistrarHuespedes: (id: string) => void;
  onHospedajeOcasional: (id: string) => void;
  onViewDetails: (id: string) => void;
  onAddAditionalChargue?: (id: string, descripcion: string, valor: number) => void;
  onAddComment: (id: string, comment: string) => void;
  onViewPayments?: (id: string) => void;
};

const statusLabels: Record<RoomStatus, string> = {
  [RoomStatus.Available]: "Disponible",
  [RoomStatus.Occupied]: "Ocupada",
  [RoomStatus.PendingCleaning]: "Aseo",
  [RoomStatus.Temporary]: "Rato",
  [RoomStatus.Reserved]: "Reservada",
};

const statusColors: Record<RoomStatus, { bg: string; text: string }> = {
  [RoomStatus.Available]: { bg: "#fffdf6", text: "#4e4e4e" },
  [RoomStatus.Occupied]: { bg: "#fdecea", text: "#d32f2f" },
  [RoomStatus.PendingCleaning]: { bg: "#e8f5e9", text: "#388e3c" },
  [RoomStatus.Temporary]: { bg: "#e3f2fd", text: "#1976d2" },
  [RoomStatus.Reserved]: { bg: "#fffde7", text: "#fbc02d" },
};

export default function RoomCard({
  room,
  stay,
  onRegistrarHuespedes,
  onHospedajeOcasional,
  onViewDetails,
  onAddAditionalChargue,
  onAddComment,
  onViewPayments,
}: Props) {
  const theme = useTheme();
  const isOccupied = room.status === RoomStatus.Occupied;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 1.5,
        borderRadius: 2,
        backgroundColor: statusColors[room.status].bg,
        color: statusColors[room.status].text,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 150, // ajustable según lo que necesites
        gap: 1,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{room.id}</Typography>
        <Box
          px={1}
          py={0.25}
          borderRadius={2}
          fontSize="0.75rem"
          fontWeight="bold"
          sx={{ backgroundColor: `${statusColors[room.status].bg}99` }}
        >
          {statusLabels[room.status]}
        </Box>
      </Box>

      {/* Descripción de la habitación */}
      {room.status === RoomStatus.Available && (
        <Typography variant="body2">
          <RoomFeatures
            doubleBed={room.doubleBed}
            singleBed={room.singleBed}
            bunkBed={room.bunkBed}
            airConditioning={room.airConditioning}
            balconyView={room.balconyView}
            jacuzzi={room.jacuzzi}
          />
        </Typography>
      )}

      {room.status === RoomStatus.Occupied && stay && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          <Link
            component="button"
            onClick={() => onViewDetails(stay.id)
            }
            underline="hover"
            sx={{ ml: 0.5 }}
          >
            Debe: ${stay.pendingPayments.toLocaleString()}{" "}
          </Link>
        </Typography>
      )}

      <Stack direction="row">
        {room.status === RoomStatus.Available && (
          <>
            <Tooltip title="Registrar Huéspedes">
              <IconButton
                onClick={() => onRegistrarHuespedes(room.id)}
                color="primary"
              >
                <LoginOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Hospedaje Ocasional">
              <IconButton
                onClick={() => onHospedajeOcasional(room.id)}
                color="secondary"
              >
                <TimelapseOutlined />
              </IconButton>
            </Tooltip>
          </>
        )}

        {isOccupied && (
          <>
            <Tooltip title="Salida">
              <IconButton
                onClick={() => onViewPayments?.(room.id)}
                sx={{ color: theme.palette.info.main }}
              >
                <LogoutOutlined />
              </IconButton>
            </Tooltip>

            <Tooltip title="Agregar cargo">
              <IconButton
                onClick={() =>
                  onAddAditionalChargue?.(room.id, "Consumo adicional", 15000)
                }
                sx={{ color: theme.palette.info.main }}
              >
                <ListAltOutlined />
              </IconButton>
            </Tooltip>

            <Tooltip title="Agregar comentario">
              <IconButton
                onClick={() => onAddComment(room.id, "Daño toalla")}
                sx={{ color: theme.palette.primary.main }}
              >
                <AddCommentOutlined />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>
    </Paper>
  );
}
