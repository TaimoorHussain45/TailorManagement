import { AppTheme } from "@/constants/theme";
import { Scissors } from "lucide-react-native";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "../ui/Typography";
import { WelcomeCardStyles } from "./styles";

type WelcomeCardProps = {
  fittingsThisWeek: number;
  readyOrdersThisWeek: number;
  totalOrdersThisWeek: number;
};

const WelcomeCard = ({
  fittingsThisWeek,
  readyOrdersThisWeek,
  totalOrdersThisWeek,
}: WelcomeCardProps) => {
  const theme = useTheme<AppTheme>();
  const styles = WelcomeCardStyles(theme);
  const progress =
    totalOrdersThisWeek > 0
      ? Math.min(readyOrdersThisWeek / totalOrdersThisWeek, 1)
      : 0;
  const progressWidth: `${number}%` = `${progress * 100}%`;

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.topRow}>
          <Typography style={styles.weekLabel}>THIS WEEK</Typography>

          <Scissors size={22} color={theme.colors.accentGold} />
        </View>

        <Typography variant="h3" style={styles.headline}>
          A little room to make.
        </Typography>
      </View>

      <View>
        <View style={styles.footerConatiner}>
          {/* Fittings */}
          <View style={styles.countBlock}>
            <Typography variant="h1" color={theme.colors.white}>
              {fittingsThisWeek}
            </Typography>

            <Typography
              color={theme.colors.textSecondary}
              style={styles.subLabel}
              variant="caption"
            >
              fittings on the table
            </Typography>
          </View>

          {/* Week Planned */}
          <View style={styles.progressWrapper}>
            <View style={styles.progressRow}>
              <Typography style={styles.progressLabel}>Week planned</Typography>

              <Typography style={styles.progressValue}>
                {readyOrdersThisWeek}/{totalOrdersThisWeek}
              </Typography>
            </View>

            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: progressWidth,
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WelcomeCard;
