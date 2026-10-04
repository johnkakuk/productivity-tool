import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../services/storage';
import Input from '../components/Input';
import Button from '../components/Button';

type Priority = Task['priority'];

const PRIORITIES: { value: Priority; label: string; dot: string }[] = [
  { value: 'high', label: 'High', dot: 'bg-accent' },
  { value: 'medium', label: 'Medium', dot: 'bg-ink-300' },
  { value: 'low', label: 'Low', dot: 'bg-ink-700' },
];

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority | null>(null);
  const [errors, setErrors] = useState<{ title?: string; priority?: string }>({});
  const [saving, setSaving] = useState(false);
  const { createTask } = useTasks();

  const handleSave = async () => {
    const cleanTitle = title.trim();

    const nextErrors: typeof errors = {};
    if (!cleanTitle) nextErrors.title = 'Give it a title.';
    if (!priority) nextErrors.priority = 'Pick a priority.';
    setErrors(nextErrors);
    if (nextErrors.title || nextErrors.priority) return;

    try {
      setSaving(true);
      const now = new Date().toISOString();
      await createTask({
        title: cleanTitle,
        description: description.trim(),
        priority: priority!,
        completed: false,
        createdAt: now,
        updatedAt: now,
      });
      router.back(); // return to tasks screen
    } catch {
      setErrors({ title: 'Couldn’t save the task. Try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-ink-950"
      contentContainerClassName="px-5 pt-4 pb-10"
      keyboardShouldPersistTaps="handled"
    >
      <Input
        label="Title"
        value={title}
        onChangeText={text => {
          setTitle(text);
          if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
        }}
        placeholder="What needs doing?"
        error={errors.title}
      />

      <Input
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Details (optional)"
        multiline
        numberOfLines={4}
      />

      <Text className="text-xs font-bold tracking-widest uppercase text-ink-500 mb-2">
        Priority
      </Text>
      <View className="flex-row gap-2">
        {PRIORITIES.map(option => {
          const selected = priority === option.value;
          return (
            <Pressable
              key={option.value}
              onPress={() => {
                setPriority(option.value);
                if (errors.priority) setErrors(prev => ({ ...prev, priority: undefined }));
              }}
              className={`flex-1 flex-row items-center justify-center gap-2 rounded-xl border py-3 ${
                selected ? 'bg-ink-800 border-accent' : 'bg-ink-900 border-ink-700 active:bg-ink-800'
              }`}
            >
              <View className={`w-2 h-2 rounded-full ${option.dot}`} />
              <Text className={`font-semibold ${selected ? 'text-ink-100' : 'text-ink-500'}`}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {errors.priority && (
        <Text className="text-rose-400 text-sm mt-1.5">{errors.priority}</Text>
      )}

      <View className="mt-8">
        <Button title="SAVE TASK" onPress={handleSave} size="lg" loading={saving} fullWidth />
      </View>
    </ScrollView>
  );
}
