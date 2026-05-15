import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Service } from "../types";

interface ServiceCardProps {
  service: Service;
  variant: "full" | "compact";
  onPress: (service: Service) => void;
  style?: StyleProp<ViewStyle>;
}

function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return "★".repeat(full) + (half ? "⯨" : "") + "☆".repeat(empty);
}

export default function ServiceCard({
  service,
  variant,
  onPress,
  style,
}: ServiceCardProps) {
  const isFull = variant === "full";

  return (
    <TouchableOpacity
      style={[isFull ? styles.cardFull : styles.cardCompact, style]}
      onPress={() => onPress(service)}
      activeOpacity={0.7}
    >
      <View style={isFull ? styles.headerRow : styles.headerRowCompact}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{service.category}</Text>
        </View>
        {!service.available && (
          <View style={styles.unavailableBadge}>
            <Text style={styles.unavailableText}>No disponible</Text>
          </View>
        )}
      </View>

      <View style={isFull ? styles.body : styles.bodyCompact}>
        <Text style={isFull ? styles.name : styles.nameCompact} numberOfLines={2}>
          {service.name}
        </Text>

        {isFull && (
          <Text style={styles.description} numberOfLines={2}>
            {service.description}
          </Text>
        )}

        <View style={isFull ? styles.metaRow : styles.metaRowCompact}>
          <View style={styles.ratingRow}>
            <Text style={styles.stars}>{renderStars(service.rating)}</Text>
            <Text style={styles.ratingText}>
              {service.rating} ({service.reviewCount})
            </Text>
          </View>
        </View>
      </View>

      <View style={isFull ? styles.footer : styles.footerCompact}>
        <Text style={styles.provider}>{service.providerName}</Text>
        <Text style={isFull ? styles.price : styles.priceCompact}>
          {service.currency === "USD" ? "$" : ""}
          {service.price.toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardFull: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  cardCompact: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    marginRight: 10,
    width: 180,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerRowCompact: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    color: "#007AFF",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  unavailableBadge: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  unavailableText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  body: {
    marginBottom: 10,
  },
  bodyCompact: {
    marginBottom: 8,
  },
  name: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
  nameCompact: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    color: "#3A3A3C",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metaRowCompact: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  stars: {
    color: "#FF9500",
    fontSize: 14,
    letterSpacing: 1,
  },
  ratingText: {
    color: "#8E8E93",
    fontSize: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F2F2F7",
  },
  footerCompact: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#F2F2F7",
  },
  provider: {
    color: "#8E8E93",
    fontSize: 11,
  },
  price: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "800",
  },
  priceCompact: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "800",
  },
});
