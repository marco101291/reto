'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAutosaveForm } from '@/hooks/useAutoSaveForm';
import useFormBuilder from '@/hooks/useFormBuilder';

import FormEditor from './FormEditor';
import FormPreview from './FormPreview';

const FormBuilder: React.FC = () => {
  const sp = useSearchParams();
  const id = sp.get('id') ?? 'new';
  const from = sp.get('from') as 'forms' | 'templates' | null;

  // 👇 remonta FormBuilder cada vez que cambia el id
  return (
    <FormBuilderScreen
      key={id}
      editingId={id !== 'new' ? id : undefined}
      from={from ?? undefined}
    />
  );
};

type Props = {
  editingId?: string;
  from?: 'forms' | 'templates';
};

const FormBuilderScreen: React.FC<Props> = ({ editingId, from }) => {
  const router = useRouter();
  const startAtCover = from === 'templates';

  const {
    form,
    currentStep,
    updateForm,
    changeStep,
    addStep,
    removeStep,
    addField,
    updateField,
    removeField
  } = useFormBuilder(editingId, { startAtCover });

  const {
    status,
    lastSavedAt,
    id: liveId
  } = useAutosaveForm({
    form,
    id: editingId,
    onFirstSave: (newId) => {
      router.replace(`/app/form-builder?id=${newId}`);
    },
    delay: 700
  });

  useEffect(() => {
    if (from === 'templates') changeStep(-1);
  }, [from, changeStep]);

  return (
    <div className="flex h-full min-h-0 flex-col md:flex-row md:divide-x">
      {/* Panel de edición */}
      <section className="flex min-h-0 flex-1 flex-col">
        {/* <div className="shrink-0 border-b px-4 py-3">
          <div className="flex items-center gap-3">
            <a
              href={
                from === 'templates'
                  ? '/dashboard/home/templates'
                  : '/dashboard/home/forms'
              }
              className="text-sm hover:underline"
            >
              ← {`${from === 'templates' ? 'Templates' : 'My forms'}`}
            </a>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={onSave}
                className="rounded border px-3 py-2 text-sm hover:bg-gray-50"
              >
                💾 Save
              </button>
              <button
                onClick={onSaveAndExit}
                className="rounded border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Save and exit
              </button>
            </div>
          </div>
        </div> */}
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <a
            href={`/app/${from === 'templates' ? 'templates' : 'forms'}`}
            className="text-sm text-muted-foreground hover:underline"
          >
            ← {`Back to ${from === 'templates' ? 'Templates' : 'My forms'}`}
          </a>

          {/* Indicador de guardado */}
          <div className="ml-auto text-xs text-muted-foreground">
            {status === 'saving' && 'Saving…'}
            {status === 'saved' &&
              `Saved${lastSavedAt ? ` • ${new Date(lastSavedAt).toLocaleTimeString()}` : ''}`}
            {status === 'error' && 'Save error'}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-4">
          <FormEditor
            form={form}
            currentStep={currentStep}
            updateForm={updateForm}
            changeStep={changeStep}
            addStep={addStep}
            removeStep={removeStep}
            addField={addField}
            updateField={updateField}
            removeField={removeField}
            coverEnabled={true}
          />
        </div>
      </section>

      {/* Panel de previsualización */}
      <section className="min-h-0 flex-1 overflow-auto p-4">
        <FormPreview
          form={form}
          previewStep={currentStep}
          setPreviewStep={changeStep} // ← viene del hook del editor
          previewMode={true}
          coverEnabled={true}
        />
      </section>
    </div>
  );
};

export default FormBuilder;
