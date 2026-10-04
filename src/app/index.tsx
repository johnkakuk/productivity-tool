import React, { useCallback, useState } from 'react';
import { Alert, View, Text, FlatList, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { Task } from '../services/storage';
import { useTasks } from '../hooks/useTasks';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { handleNavigation } from '@/utils/handleNavigation';
import Button from '../components/Button';

type Filter = 'all' | 'open' | 'done';
type SortBy = 'newest' | 'priority';

// Lower number = more important, so it sorts first
const PRIORITY_RANK: Record<Task['priority'], number> = { high: 0, medium: 1, low: 2 };

export default function TasksScreen() {
  // const [tasks, setTasks] = useState<Task[]>([
  //   {
  //     id: '1',
  //     title: 'Learn Expo',
  //     description: 'Complete the first module',
  //     completed: false,
  //     createdAt: new Date(),
  //     priority: 1,
  //   },
  // ]);

  // const toggleTask = (id: string) => {
  //   setTasks(tasks.map(task => 
  //     task.id === id ? { ...task, completed: !task.completed } : task
  //   ));
  // };

  // Replaces two blocks above (now backed by persistent storage instead of TasksContext)
  const { tasks, loading, error, deleteTask, updateTask, refreshTasks } = useTasks();
  const breakpoint = useBreakpoint();
  const [filter, setFilter] = useState<Filter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('newest');

  // Refresh tasks when screen comes into focus (after navigation)
  useFocusEffect(
    useCallback(() => {
      console.log('Screen focused, refreshing tasks');
      refreshTasks();
    }, [refreshTasks])
  );

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await updateTask(id, { completed: !completed });
    } catch {
      Alert.alert('Error', 'Failed to update task');
    }
  };

  const confirmDelete = async (id: number) => {
    try {
      await deleteTask(id);
    } catch {
      Alert.alert('Error', 'Failed to delete task');
    }
  };

  const handleDeleteTask = (id: number) => {
    // Alert buttons are a no-op on web, so fall back to the browser's confirm dialog
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete this task?')) {
        confirmDelete(id);
      }
      return;
    }

    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => confirmDelete(id) },
      ]
    );
  };

  // High priority gets the accent; lower priorities fade into the background
  const priorityStyles: Record<Task['priority'], { bar: string; label: string }> = {
    high: { bar: 'bg-accent', label: 'text-accent' },
    medium: { bar: 'bg-ink-300', label: 'text-ink-300' },
    low: { bar: 'bg-ink-700', label: 'text-ink-500' },
  };

  // More columns on wider screens (tablets, desktop web)
  const getNumColumns = () => {
    switch (breakpoint) {
      case 'xl': return 3;
      case 'lg': return 2;
      default: return 1;
    }
  };

  const openCount = tasks.filter(task => !task.completed).length;
  const doneCount = tasks.length - openCount;

  const FILTER_OPTIONS: { value: Filter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: tasks.length },
    { value: 'open', label: 'Open', count: openCount },
    { value: 'done', label: 'Done', count: doneCount },
  ];

  // 1. Filter: keep only the tasks that match the selected tab
  const filteredTasks = tasks.filter(task => {
    if (filter === 'open') return !task.completed;
    if (filter === 'done') return task.completed;
    return true; // 'all'
  });

  // 2. Sort: .filter() already made a new array, so sorting it won't touch `tasks`
  const visibleTasks = filteredTasks.sort((a, b) => {
    if (sortBy === 'priority') return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
    return b.createdAt.localeCompare(a.createdAt); // 'newest' (ISO dates sort as text)
  });

  const renderTask = ({ item }: { item: Task }) => {
    const priority = priorityStyles[item.priority] ?? priorityStyles.low;

    return (
      <View className={`flex-1 ${getNumColumns() > 1 ? 'mx-1.5' : ''} mb-3`}>
        <Pressable
          onPress={() => handleToggleComplete(item.id!, item.completed)}
          className={`flex-row items-center rounded-2xl border px-4 py-4 active:bg-ink-800 ${
            item.completed ? 'bg-ink-950 border-ink-800' : 'bg-ink-900 border-ink-800'
          }`}
        >
          {/* Priority bar */}
          <View className={`w-1 self-stretch rounded-full mr-4 ${item.completed ? 'bg-ink-800' : priority.bar}`} />

          {/* Checkbox */}
          <View
            className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-4 ${
              item.completed ? 'bg-accent border-accent' : 'border-ink-500'
            }`}
          >
            {item.completed && <Text className="text-ink-950 text-xs font-black">✓</Text>}
          </View>

          <View className="flex-1">
            <Text
              className={`text-base font-semibold ${
                item.completed ? 'line-through text-ink-500' : 'text-ink-100'
              }`}
            >
              {item.title}
            </Text>
            {!!item.description && (
              <Text className="text-sm text-ink-500 mt-0.5" numberOfLines={2}>
                {item.description}
              </Text>
            )}
          </View>

          <Text className={`text-[10px] font-bold tracking-widest uppercase ml-3 ${
            item.completed ? 'text-ink-700' : priority.label
          }`}>
            {item.priority}
          </Text>

          <Pressable
            onPress={() => handleDeleteTask(item.id!)}
            hitSlop={10}
            className="ml-3 p-1 rounded-full active:bg-ink-700"
          >
            <Text className="text-ink-500 text-base">✕</Text>
          </Pressable>
        </Pressable>
      </View>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-ink-950">
        <Text className="text-sm tracking-widest uppercase text-ink-500">Loading…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-ink-950 px-6">
        <Text className="text-xs font-bold tracking-widest uppercase text-accent mb-2">Something broke</Text>
        <Text className="text-base text-ink-300 text-center">{error}</Text>
      </View>
    );
  }

  return (
    // SafeAreaView isn't a core component, so NativeWind's className doesn't reach it
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#0b0b0f' }}>
      <FlatList
        data={visibleTasks}
        renderItem={renderTask}
        keyExtractor={item => item.id?.toString() || ''}
        numColumns={getNumColumns()}
        key={getNumColumns()} // Force re-render when columns change
        contentContainerStyle={{ padding: 20, paddingBottom: 8, flexGrow: 1 }}
        ListHeaderComponent={
          <View className="mb-6 mt-2">
            <Text className="text-xs font-bold tracking-[4px] uppercase text-accent">Your list</Text>
            <Text className="text-4xl font-black text-ink-100 mt-1">Tasks</Text>
            <Text className="text-sm text-ink-500 mt-1">
              {openCount} open · {doneCount} done
            </Text>

            {/* Filters on the left, sort toggle on the right */}
            <View className="flex-row items-center justify-between mt-5">
              <View className="flex-row gap-2">
                {FILTER_OPTIONS.map(option => {
                  const selected = filter === option.value;
                  return (
                    <Pressable
                      key={option.value}
                      onPress={() => setFilter(option.value)}
                      className={`flex-row items-center gap-1.5 rounded-full border px-3 py-2 ${
                        selected ? 'bg-accent border-accent' : 'bg-ink-900 border-ink-800 active:bg-ink-800'
                      }`}
                    >
                      <Text className={`text-sm font-semibold ${selected ? 'text-ink-950' : 'text-ink-300'}`}>
                        {option.label}
                      </Text>
                      <Text className={`text-xs font-bold ${selected ? 'text-ink-950/60' : 'text-ink-500'}`}>
                        {option.count}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Tap to switch between Newest and Priority */}
              <Pressable
                onPress={() => setSortBy(sortBy === 'newest' ? 'priority' : 'newest')}
                hitSlop={8}
                className="flex-row items-center gap-1 rounded-full px-3 py-2 active:bg-ink-900"
              >
                <Text className="text-sm text-ink-500">⇅</Text>
                <Text className="text-sm font-semibold text-accent">
                  {sortBy === 'newest' ? 'Newest' : 'Priority'}
                </Text>
              </Pressable>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center pb-20">
            <Text className="text-5xl text-ink-800 mb-4">◌</Text>
            <Text className="text-lg font-semibold text-ink-300 mb-1">
              {filter === 'open' ? 'All clear.' : filter === 'done' ? 'Nothing done yet.' : 'Nothing here.'}
            </Text>
            <Text className="text-sm text-ink-500 text-center">
              {tasks.length === 0 ? 'Add a task to get started.' : 'Try a different filter.'}
            </Text>
          </View>
        }
      />
      
      <View className="px-5 pt-2 pb-6 border-t border-ink-900">
        <Button title="+  NEW TASK" onPress={() => handleNavigation('/add-task')} size="lg" fullWidth />
      </View>
    </SafeAreaView>
  );
}
