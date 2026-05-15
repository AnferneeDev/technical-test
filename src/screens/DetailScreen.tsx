import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return "★".repeat(full) + (half ? "⯨" : "") + "☆".repeat(empty);
}

export default function DetailScreen({ route, navigation }: Props) {
  const { service } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{service.category}</Text>
        </View>
        {!service.available && (
          <View style={styles.unavailableBadge}>
            <Text style={styles.unavailableText}>No disponible</Text>
          </View>
        )}
      </View>

      <Text style={styles.name}>{service.name}</Text>
      <Text style={styles.provider}>por {service.providerName}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>
          {service.currency === "USD" ? "$" : ""}
          {service.price.toLocaleString()}{" "}
          <Text style={styles.currency}>{service.currency}</Text>
        </Text>
      </View>

      <View style={styles.ratingRow}>
        <Text style={styles.stars}>{renderStars(service.rating)}</Text>
        <Text style={styles.ratingText}>
          {service.rating} · {service.reviewCount} reseñas
        </Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionLabel}>Descripción</Text>
      <Text style={styles.description}>{service.description}</Text>

      <View style={styles.detailGrid}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Duración</Text>
          <Text style={styles.detailValue}>
            {Math.floor(service.durationMinutes / 60)}h{" "}
            {service.durationMinutes % 60 > 0
              ? `${service.durationMinutes % 60}m`
              : ""}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Tags</Text>
          <Text style={styles.detailValue}>
            {service.tags.length > 0 ? service.tags.join(", ") : "Ninguno"}
          </Text>
        </View>
      </View>

      {service.tags.length > 0 && (
        <View style={styles.tagsRow}>
          {service.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.actionArea}>
        {service.available ? (
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate("Request", { service })}
            activeOpacity={0.7}
          >
            <Text style={styles.ctaText}>Solicitar servicio</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity style={styles.ctaButtonDisabled} disabled>
              <Text style={styles.ctaTextDisabled}>Solicitar servicio</Text>
            </TouchableOpacity>
            <Text style={styles.unavailableReason}>
              Este servicio no está disponible en este momento.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f3460",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  categoryBadge: {
    backgroundColor: "#e94560",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  unavailableBadge: {
    backgroundColor: "#e74c3c",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  unavailableText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  name: {
    color: "#e0e0e0",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  provider: {
    color: "#666680",
    fontSize: 14,
    marginBottom: 16,
  },
  priceRow: {
    marginBottom: 12,
  },
  price: {
    color: "#f0a500",
    fontSize: 28,
    fontWeight: "800",
  },
  currency: {
    fontSize: 16,
    fontWeight: "500",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  stars: {
    color: "#f0a500",
    fontSize: 18,
    letterSpacing: 2,
  },
  ratingText: {
    color: "#8888a0",
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#1a1a3e",
    marginVertical: 20,
  },
  sectionLabel: {
    color: "#8888a0",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 8,
    letterSpacing: 1,
  },
  description: {
    color: "#c0c0d0",
    fontSize: 15,
    lineHeight: 22,
  },
  detailGrid: {
    flexDirection: "row",
    gap: 24,
    marginTop: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    color: "#666680",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  detailValue: {
    color: "#e0e0e0",
    fontSize: 14,
  },
  tagsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#16213e",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1a1a3e",
  },
  tagText: {
    color: "#8888a0",
    fontSize: 12,
  },
  actionArea: {
    alignItems: "center",
  },
  ctaButton: {
    backgroundColor: "#e94560",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  ctaButtonDisabled: {
    backgroundColor: "#1a1a3e",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  ctaTextDisabled: {
    color: "#555570",
    fontSize: 16,
    fontWeight: "700",
  },
  unavailableReason: {
    color: "#e74c3c",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
});
