"use client";
import type { Itask } from "@/store/taskDeadlineStore";
import { useContext, useState } from "react";
import { Context } from "@/app/mobx-provider";
import DatePicker from "react-datepicker";
import { buttonStyle } from "./NewTask";
import { UpdateTask } from "@/http/Task";
import { observer } from "mobx-react-lite";

interface Iconf {
  configTask: Itask;
}

const UpdateFunction = ({ configTask }: Iconf) => {
  const { task, store, taskNow, message } = useContext(Context);
  const [finishTask, setFinishTask] = useState<boolean>(false);
  const [config, setConfig] = useState<Itask>({
    id: configTask.id,
    title: configTask.title,
    description: configTask.description,
    UserId: configTask.UserId,
    deadline: new Date(),
    priority: configTask.priority,
    status: "todo",
    notified: false,
  });

  const fuPriority = (priority: string) => {
    setConfig((prev: Itask) => ({ ...prev, priority: priority }));
  };

  const fuSaveUploadTask = async () => {
    try {
      const uploadTask = await UpdateTask(config);
      if (uploadTask.message) {
        store.postError(uploadTask.message);
      } else {
        taskNow.postTask(uploadTask);
        message.postQuantity(1);
        task.postWindowMessageTask(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {task.getWindowUpdateTask() && (
        <section key={configTask.id} className="fixed inset-0 backdrop-blur-[5px] z-99">
          <div className="grid justify-center mt-[100px]">
            <div className="border p-4 rounded-2xl border-gray-300 bg-white shadow-2xl">
              <div className="grid gap-3">
                <div className="">
                  <div className="text-[17px] font-bold">Название</div>
                  <input
                    value={config.title}
                    onChange={(e) => setConfig((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Найти рейсы для поездки p2"
                    className="text-[19px] w-full text-gray-800/70 outline-none"
                  />
                  <hr className="mt-2 text-gray-400" />
                </div>
                <div>
                  <div className="text-[17px] font-bold">Описание</div>
                  <input
                    value={config.description}
                    onChange={(e) => setConfig((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Описание"
                    className="text-[19px] w-full text-gray-800/70 outline-none"
                  />
                  <hr className="mt-2 text-gray-400" />
                </div>
                <div>
                  <div className="text-[17px] font-bold">Дедлайн</div>
                  <DatePicker
                    placeholderText={`Введите время`}
                    selected={config.deadline}
                    onChange={(date) => setConfig((prev) => ({ ...prev, deadline: date }))}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    dateFormat="dd.MM.yyyy HH:mm"
                    className={`cursor-pointer text-center text-[14px]`}
                  />
                  <hr className="mt-2 text-gray-400" />
                </div>
                <div>
                  <div className="text-[17px] font-bold">{`Текущий приоритет: ${config.priority}`}</div>
                  <div className="flex gap-3">
                    <button onClick={() => fuPriority("high")} className={`${buttonStyle} bg-[rgb(192_61_61)] hover:bg-red-800 text-gray-900`}>
                      Высокий
                    </button>
                    <button onClick={() => fuPriority("medium")} className={`${buttonStyle} bg-[rgb(240_120_2)] hover:bg-orange-600 text-gray-900`}>
                      Средний
                    </button>
                    <button onClick={() => fuPriority("low")} className={`${buttonStyle} bg-[rgb(255_242_0)] hover:bg-yellow-500 text-gray-900`}>
                      Низкий
                    </button>
                    <button onClick={() => fuPriority("none")} className={`${buttonStyle} bg-white text-gray-900 text-[15px] w-4 `}>
                      Без приоритета
                    </button>
                  </div>
                </div>
              </div>
              <hr className="mt-2 text-gray-400" />
              <section className="flex gap-5 justify-end mt-2">
                <button className={`${buttonStyle} text-gray-900`} onClick={() => task.postWindowUpdateTask(false)}>
                  Назад
                </button>
                <button className={`${buttonStyle} text-gray-900`} onClick={() => setFinishTask(true)}>
                  Далее
                </button>
              </section>
            </div>
          </div>
          {finishTask && (
            <div className="absolute top-0 flex flex-col w-screen h-screen items-center justify-center transition duration-900 z-9999">
              <div className="grid bg-white p-2 border rounded border-gray-300 shadow-2xl gap-2">
                <div className="">После обновления, все ваши старые данные будут удалены. </div>
                <div className="flex gap-7 justify-center">
                  <button
                    className={`${buttonStyle} text-gray-900`}
                    onClick={() => {
                      fuSaveUploadTask();
                      setFinishTask(false);
                      task.postWindowUpdateTask(false);
                    }}
                  >
                    Сохранить
                  </button>
                  <button className={`${buttonStyle} text-gray-900`} onClick={() => setFinishTask(false)}>
                    Назад
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default observer(UpdateFunction);
