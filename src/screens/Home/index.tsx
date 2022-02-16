import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { getAllData } from "../../helpers";
import { getDatabase, onValue, ref, update } from "firebase/database";

const mock = [
  {
    id: "sjhdkshdfksdf",
    description: "Fazer coco no banheiro",
    points: 3,
    award: "Ir brincar no shopping dia 18/02",
    limitDate: new Date().toLocaleDateString(),
  },
  {
    id: "sjhdksdshdfksdf",
    description: "Comer sem celular",
    points: 5,
    award: "Ir brincar no shopping dia 18/02",
    limitDate: new Date().toLocaleDateString(),
  },
  {
    id: "sjhdkshdfsdsksdf",
    description: "Dormir no horario",
    points: 8,
    award: "Ir brincar no shopping dia 18/02",
    limitDate: new Date().toLocaleDateString(),
  },
];

interface Props {
  handlePress?: () => void;
  points: number;
  index: number;
}

const Star: React.FC<Props> = ({ handlePress, points, index }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Icon
        name="star"
        size={30}
        color={index <= points ? "#ffef08" : "#dadada"}
      />
    </TouchableOpacity>
  );
};

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<any[] | undefined>();

  function handleNavigate() {
    navigation.navigate("TasksConfig");
  }

  const getData = useCallback(async () => {
    try {
      const data = await getAllData();

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
    const refDb = ref(getDatabase());
    onValue(refDb, getData);
  }, []);

  function updateStar(id: string, points: number) {
    const db = getDatabase();
    const starCountRef = ref(db, id);

    update(starCountRef, { points });
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {tasks &&
          tasks.map((item) => (
            <View key={item.id} style={styles.containerItem}>
              <Text style={styles.limitDate}>
                Data limite: {item.limitDate}
              </Text>
              <Text>Tarefa: {"\n" + item.description}</Text>
              <Text>Recompensa: {"\n" + item.award}</Text>
              <View style={styles.row}>
                {[...Array(10)].map((_, i) => (
                  <Star
                    key={item.id + i}
                    index={i + 1}
                    points={item.points}
                    handlePress={() =>
                      updateStar(item.id, item.points === i + 1 ? i : i + 1)
                    }
                  />
                ))}
              </View>
            </View>
          ))}
      </ScrollView>
      <TouchableOpacity onPress={handleNavigate} style={styles.buttonAdd}>
        <Icon name="plus" size={40} color="#10ff44be" />
      </TouchableOpacity>
    </View>
  );
};

export { Home };
