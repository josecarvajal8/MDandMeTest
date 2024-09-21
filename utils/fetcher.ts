export const fetchData = async <T>({
    url,
    method = 'GET',
    body,
  }: {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: any;
  }) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data: T = await response.json();
      return data;
    } catch (error) {
      throw new Error(`error fetching ${error}`);
    }
  };
  