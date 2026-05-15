import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

interface StateWrapperProps {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  onRetry: () => void;
  children: React.ReactNode;
}

export default function StateWrapper({
  loading,
  error,
  isEmpty,
  onRetry,
  children,
}: StateWrapperProps) {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.statusText}>Cargando servicios...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorIcon}>!</Text>
        <Text style={styles.errorTitle}>Algo salió mal</Text>
        <Text style={styles.statusText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyIcon}>0</Text>
        <Text style={styles.emptyTitle}>Sin resultados</Text>
        <Text style={styles.statusText}>
          No hay servicios para esta categoría.
        </Text>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  statusText: {
    color: "#8E8E93",
    fontSize: 14,
    marginTop: 12,
    textAlign: "center",
  },
  errorIcon: {
    color: "#FF3B30",
    fontSize: 48,
    fontWeight: "800",
    marginBottom: 8,
  },
  errorTitle: {
    color: "#FF3B30",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  emptyIcon: {
    color: "#8E8E93",
    fontSize: 48,
    fontWeight: "800",
    marginBottom: 8,
  },
  emptyTitle: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
