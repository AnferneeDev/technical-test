import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, FormData, FormErrors } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Request">;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 3) {
    errors.fullName = "Ingresa tu nombre completo (mínimo 3 caracteres).";
  }

  const phoneDigits = data.phone.replace(/\D/g, "");
  if (!data.phone.trim() || phoneDigits.length < 7) {
    errors.phone = "Ingresa un número de teléfono válido.";
  }

  if (!data.preferredDate.trim()) {
    errors.preferredDate = "Selecciona una fecha preferida.";
  }

  return errors;
}

export default function RequestScreen({ route }: Props) {
  const { service } = route.params;
  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    preferredDate: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const handleChange = (field: keyof FormData, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    setErrors(validate(next));
  };

  const hasErrors = Object.keys(validate(form)).length > 0;
  const isFormIncomplete = !form.fullName || !form.phone || !form.preferredDate;

  const handleSubmit = () => {
    const fieldErrors = validate(form);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) return;

    setStatus("sending");

    setTimeout(() => {
      const random = Math.random();
      if (random < 0.7) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }, 1500);
  };

  const handleRetry = () => {
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.successIcon}>&#10003;</Text>
        <Text style={styles.successTitle}>Solicitud enviada</Text>
        <Text style={styles.resultText}>
          Tu solicitud para "{service.name}" ha sido recibida. El proveedor se
          pondrá en contacto contigo pronto.
        </Text>
      </View>
    );
  }

  if (status === "error") {
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.errorIcon}>!</Text>
        <Text style={styles.errorTitle}>Error al enviar</Text>
        <Text style={styles.resultText}>
          No se pudo procesar tu solicitud. Inténtalo de nuevo.
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryText}>Volver a intentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.serviceProvider}>{service.providerName}</Text>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={[styles.input, errors.fullName ? styles.inputError : null]}
          value={form.fullName}
          onChangeText={(v) => handleChange("fullName", v)}
          placeholder="Ej. María Rodríguez"
          placeholderTextColor="#555570"
          autoCapitalize="words"
        />
        {errors.fullName && (
          <Text style={styles.fieldError}>{errors.fullName}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={[styles.input, errors.phone ? styles.inputError : null]}
          value={form.phone}
          onChangeText={(v) => handleChange("phone", v)}
          placeholder="Ej. +58 412 123 4567"
          placeholderTextColor="#555570"
          keyboardType="phone-pad"
        />
        {errors.phone && (
          <Text style={styles.fieldError}>{errors.phone}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Fecha preferida</Text>
        <TextInput
          style={[styles.input, errors.preferredDate ? styles.inputError : null]}
          value={form.preferredDate}
          onChangeText={(v) => handleChange("preferredDate", v)}
          placeholder="Ej. 2026-06-15"
          placeholderTextColor="#555570"
          keyboardType="numbers-and-punctuation"
        />
        {errors.preferredDate && (
          <Text style={styles.fieldError}>{errors.preferredDate}</Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          (hasErrors || isFormIncomplete) ? styles.submitDisabled : null,
        ]}
        onPress={handleSubmit}
        disabled={hasErrors || isFormIncomplete || status === "sending"}
        activeOpacity={0.7}
      >
        {status === "sending" ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={[
              styles.submitText,
              (hasErrors || isFormIncomplete) ? styles.submitTextDisabled : null,
            ]}
          >
            Enviar solicitud
          </Text>
        )}
      </TouchableOpacity>
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
  serviceInfo: {
    backgroundColor: "#16213e",
    padding: 16,
    borderRadius: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#1a1a3e",
  },
  serviceName: {
    color: "#e0e0e0",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  serviceProvider: {
    color: "#666680",
    fontSize: 13,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    color: "#c0c0d0",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#16213e",
    borderWidth: 1,
    borderColor: "#1a1a3e",
    borderRadius: 8,
    padding: 12,
    color: "#e0e0e0",
    fontSize: 15,
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  fieldError: {
    color: "#e74c3c",
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "#e94560",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  submitDisabled: {
    backgroundColor: "#1a1a3e",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  submitTextDisabled: {
    color: "#555570",
  },
  resultContainer: {
    flex: 1,
    backgroundColor: "#0f3460",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  successIcon: {
    color: "#2ecc71",
    fontSize: 56,
    fontWeight: "800",
    marginBottom: 16,
  },
  successTitle: {
    color: "#e0e0e0",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  errorIcon: {
    color: "#e74c3c",
    fontSize: 56,
    fontWeight: "800",
    marginBottom: 16,
  },
  errorTitle: {
    color: "#e74c3c",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  resultText: {
    color: "#8888a0",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  retryButton: {
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
