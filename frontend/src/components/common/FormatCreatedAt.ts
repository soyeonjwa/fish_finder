export const formatCreatedAt = (createdAtString : string) => {
    const now = new Date();
    const createdAt = new Date(createdAtString);

    const isSameDay = now.getDate() === createdAt.getDate() &&
                      now.getMonth() === createdAt.getMonth() &&
                      now.getFullYear() === createdAt.getFullYear();

    if (isSameDay) {
        const hours = createdAt.getHours().toString().padStart(2, '0');
        const minutes = createdAt.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    } else {
        const month = (createdAt.getMonth() + 1).toString().padStart(2, '0'); 
        const date = createdAt.getDate().toString().padStart(2, '0');
        return `${month}.${date}`;
    }
  };