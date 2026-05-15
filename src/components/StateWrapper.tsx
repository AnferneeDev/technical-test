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
        <ActivityIndicator size="large" color="#e94560" />
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
    color: "#8888a0",
    fontSize: 14,
    marginTop: 12,
    textAlign: "center",
  },
  errorIcon: {
    color: "#e74c3c",
    fontSize: 48,
    fontWeight: "800",
    marginBottom: 8,
  },
  errorTitle: {
    color: "#e74c3c",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  emptyIcon: {
    color: "#666680",
    fontSize: 48,
    fontWeight: "800",
    marginBottom: 8,
  },
  emptyTitle: {
    color: "#8888a0",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: "#e94560",
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
