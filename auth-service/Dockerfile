# ---------- Build Stage ----------
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy only the auth-service folder
COPY . .

# Build the project
RUN mvn -B clean package -DskipTests

# ---------- Run Stage ----------
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy built jar
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
