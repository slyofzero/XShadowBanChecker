import { ShadowBanData } from "@/types";
import { apiFetcher } from "./api";

export async function getShadowBanData(username: string) {
  const url = `https://shadowban-api.yuzurisa.com:444/${username}`;
  const shadowbanRes = await apiFetcher<ShadowBanData>(url);
  const profileData = shadowbanRes?.data;

  if (!profileData || profileData.profile.error) {
    return false;
  }

  const output = {
    profile_exists: profileData.profile.exists,
    search_ban: false,
    suggestion_ban: !profileData.tests.typeahead,
    ghost_ban: profileData.tests.ghost.ban,
    reply_deboosting: profileData.tests.more_replies.ban,
  };

  return output;
}
