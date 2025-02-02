const Api = "https://api.green-api.com/";
const URL = (idInstance: string, apiTokenInstance: string, action: string) => {
  return `${Api}waInstance${idInstance}/${action}/${apiTokenInstance}`;
};

export async function getStateInstance(action: string) {
  const idInstance = localStorage.getItem("idInstance");
  const apiTokenInstance = localStorage.getItem("apiTokenInstance");
  try {
    const response = await fetch(URL(idInstance, apiTokenInstance, action));
    const responseData = await response.json();
    if (responseData.stateInstance) {
      return responseData;
    } else {
      throw new Error("Invalid response from server.");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function getSettings(action: string) {
  const idInstance = localStorage.getItem("idInstance");
  const apiTokenInstance = localStorage.getItem("apiTokenInstance");
  try {
    const response = await fetch(URL(idInstance, apiTokenInstance, action));
    if (!response.ok) {
      throw new Error("Ошибка запроса getSettings");
    }
    if (response.ok) {
      const { wid } = await response.json();
      return { wid };
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function getContactInfo(action: string) {
  const idInstance = localStorage.getItem("idInstance");
  const apiTokenInstance = localStorage.getItem("apiTokenInstance");
  const chatId = localStorage.getItem("phoneNumber");
  try {
    const response = await fetch(URL(idInstance, apiTokenInstance, action), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: chatId,
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка запроса getContactInfo");
    }
    if (response.ok) {
      const { name, avatar } = await response.json();
      return { name, avatar };
    }
    return;
  } catch (error) {
    console.error(error);
  }
}

export async function sendMessage(outMessage: string, action: string) {
  const idInstance = localStorage.getItem("idInstance");
  const apiTokenInstance = localStorage.getItem("apiTokenInstance");
  const chatId = localStorage.getItem("phoneNumber");
  try {
    const response = await fetch(URL(idInstance, apiTokenInstance, action), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: chatId,
        message: outMessage,
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка отправки");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function ReceiveMessage(action: string) {
  const idInstance = localStorage.getItem("idInstance");
  const apiTokenInstance = localStorage.getItem("apiTokenInstance");
  const chatId = localStorage.getItem("phoneNumber");

  let responseData;
  try {
    const response = await fetch(URL(idInstance, apiTokenInstance, action));
    if (!response.ok) {
      throw new Error("Ошибка запроса на получение уведомлений");
    }
    responseData = await response.json();
    if (
      responseData &&
      responseData.body.typeWebhook === "incomingMessageReceived"
    ) {
      const textMessage =
        responseData.body.messageData?.textMessageData?.textMessage;
      const sender = responseData.body.senderData?.sender;
      const senderName = responseData.body.senderData?.senderName;
      if (sender === chatId) {
        return { textMessage, sender, senderName };
      }
    }
    return;
  } catch (error) {
    console.error("Ошибка ReceiveMessage:", error);
  } finally {
    if (responseData) {
      const receiptId = responseData.receiptId;
      await DeleteNotification(idInstance, apiTokenInstance, receiptId);
    }
  }
}

async function DeleteNotification(
  idInstance: string,
  apiTokenInstance: string,
  receiptId: string
) {
  try {
    const deleteUrl = `${Api}waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`;

    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка запроса на удаление уведомления");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getMyAvatar(action: string) {
  const idInstance = localStorage.getItem("idInstance");
  const apiTokenInstance = localStorage.getItem("apiTokenInstance");
  const ownerId = localStorage.getItem("ownerId");
  try {
    const response = await fetch(URL(idInstance, apiTokenInstance, action), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: ownerId,
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка запроса");
    }
    // Сохраняем responseData
    const responseData = await response.json();
    // Извлекаем адрес аватара
    if (responseData && responseData.existsWhatsapp === true) {
      return responseData.urlAvatar;
    }
  } catch (error) {
    console.error(error);
  }
}
