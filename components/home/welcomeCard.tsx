import { AppTheme } from "@/constants/theme";
import { Scissors } from "lucide-react-native";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "../ui/Typography";
import { WelcomeCardStyles } from "./styles";

const WelcomeCard = () => {
  const theme = useTheme<AppTheme>();
  const styles = WelcomeCardStyles(theme);
  const weekPlannedPercent = 64;

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
          <View style={styles.countBlock}>
            <Typography variant="h1" color={theme.colors.white}>
              8
            </Typography>
            <Typography
              color={theme.colors.textSecondary}
              style={styles.subLabel}
              variant="caption"
            >
              fittings on the table
            </Typography>
          </View>

          <View style={styles.progressWrapper}>
            <View style={styles.progressRow}>
              <Typography style={styles.progressLabel}>Week planned</Typography>
              <Typography style={styles.progressValue}>
                {weekPlannedPercent}%
              </Typography>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${weekPlannedPercent}%` },
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
