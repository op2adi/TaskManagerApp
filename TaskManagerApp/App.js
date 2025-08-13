import { format, isBefore, parseISO } from "date-fns";
import { useState } from "react";
import { FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [expiry, setExpiry] = useState("");
  const [tasks, setTasks] = useState([]);

  // Remove expired tasks automatically
  const now = new Date();
  const filteredTasks = tasks.filter(t => !t.expiry || isBefore(now, parseISO(t.expiry)));

  const addTask = () => {
    if (task.trim() === "") return;
    let expiryDate = expiry ? new Date(expiry) : null;
    if (expiry && isBefore(expiryDate, now)) {
      alert("Expiry date/time must be in the future.");
      return;
    }
    setTasks([
      ...filteredTasks,
      {
        id: Date.now().toString(),
        text: task,
        completed: false,
        createdAt: now.toISOString(),
        expiry: expiry ? expiryDate.toISOString() : null,
      },
    ]);
    setTask("");
    setExpiry("");
  };

  const toggleTask = (id) => {
    setTasks(
      filteredTasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(filteredTasks.filter((t) => t.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleTask(item.id)} style={{ flex: 1 }}>
        <Text style={[styles.taskText, item.completed && styles.completedTask]}>
          {item.text}
        </Text>
        <Text style={styles.timeText}>
          {item.createdAt ? format(new Date(item.createdAt), "MMM d, yyyy h:mm a") : ""}
        </Text>
        {item.expiry && (
          <Text style={styles.expiryText}>
            Expires: {format(new Date(item.expiry), "MMM d, yyyy h:mm a")}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 Task Manager</Text>

      {/* Input + Add Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task"
          placeholderTextColor="#aaa"
          value={task}
          onChangeText={setTask}
          returnKeyType="done"
        />
        <TextInput
          style={styles.input}
          placeholder="Expiry (YYYY-MM-DD HH:mm) optional"
          placeholderTextColor="#aaa"
          value={expiry}
          onChangeText={setExpiry}
          returnKeyType="done"
          keyboardType="default"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet. Add your first task!</Text>}
        contentContainerStyle={filteredTasks.length === 0 && { flex: 1, justifyContent: 'center' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ecef",
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    paddingHorizontal: 18,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 28,
    textAlign: "center",
    color: "#22223b",
    letterSpacing: 1,
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Bold' : 'sans-serif-medium',
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: "#f7f7f7",
    fontSize: 17,
    color: "#22223b",
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif' ,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: "#5f6caf",
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
    minWidth: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 1,
  },
  addText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  taskItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 14,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#dee2e6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  taskText: {
    fontSize: 18,
    color: "#22223b",
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif',
    marginBottom: 2,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#adb5bd",
    opacity: 0.7,
  },
  timeText: {
    fontSize: 12,
    color: "#868e96",
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif',
  },
  expiryText: {
    fontSize: 12,
    color: "#e67e22",
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif',
  },
  deleteButton: {
    marginLeft: 12,
    backgroundColor: "#f44336",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 1,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  emptyText: {
    textAlign: 'center',
    color: '#adb5bd',
    fontSize: 18,
    marginTop: 40,
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif',
  },
});