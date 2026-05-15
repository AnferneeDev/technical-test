import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Service } from "../types";
import { categories } from "../data/mockServices";
import useServices from "../hooks/useServices";
import ServiceCard from "../components/ServiceCard";
import CategoryChips from "../components/CategoryChips";
import StateWrapper from "../components/StateWrapper";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { state, services, featured, retry } = useServices();
  const [activeCategory, setActiveCategory] = useState("Todas");

  const filteredServices = useMemo(() => {
    if (activeCategory === "Todas") return services;
    return services.filter((s) => s.category === activeCategory);
  }, [services, activeCategory]);

  const handleServicePress = (service: Service) => {
    navigation.navigate("Detail", { service });
  };

  const renderFeatured = () => {
    if (featured.length === 0) return null;
    return (
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Servicios destacados</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredContent}
        >
          {featured.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              variant="compact"
              onPress={handleServicePress}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderContent = () => (
    <FlatList
      data={filteredServices}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <>
          {renderFeatured()}
          <CategoryChips
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </>
      }
      renderItem={({ item }) => (
        <ServiceCard
          service={item}
          variant="full"
          onPress={handleServicePress}
        />
      )}
    />
  );

  return (
    <View style={styles.container}>
      <StateWrapper
        loading={state === "loading"}
        error={state === "error" ? "No se pudo cargar la lista de servicios." : null}
        isEmpty={state === "ok" && filteredServices.length === 0}
        onRetry={retry}
      >
        {renderContent()}
      </StateWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  featuredSection: {
    paddingTop: 16,
  },
  sectionTitle: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 10,
  },
  featuredContent: {
    paddingLeft: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingBottom: 24,
  },
});
