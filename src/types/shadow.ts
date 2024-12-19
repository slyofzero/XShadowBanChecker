interface ShadowBanTest {
  ban: boolean;
  in_reply_to: string;
  tweet: string;
}

export interface ShadowBanData {
  profile: {
    error: null | string;
    exists: boolean;
    has_tweets: boolean;
    id: string;
    screen_name: string;
  };
  tests: {
    ghost: ShadowBanTest | Record<string, never>;
    more_replies: ShadowBanTest | Record<string, never>;
    search: string;
    typeahead: false;
  };
  timestamp: number;
}
