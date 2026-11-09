"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { noteTrackerGenericErrorInfo } from "../../../../../../services/noteTrackerService";
import { PAGE_SIZE, extendedKind, isFatalError } from "./ntUtils";

const EMPTY = { items: [], totalPages: 0, totalElements: 0 };

/**
 * Loads a PageResult<T> list with paging, filters, loading and error state.
 *
 * @param {(params) => Promise} fetcher   e.g. getNoteTrackerNotes; called with {...filters, page, size}
 * @param {object} filters                plain object; any change resets to page 0 and reloads
 * @param {{size?: number, onFatal?: (info) => void, enabled?: boolean}} [options]
 *        onFatal is called for NOTETRACKER_DISABLED / 403 / NOTETRACKER_WORKFLOWS_DISABLED
 *        (the page then shows its error panel instead of the list).
 * @returns {{items, page, setPage, totalPages, totalElements, loading, error, reload, replaceItem}}
 */
export default function useNtPagedList(
  fetcher,
  filters,
  { size = PAGE_SIZE, onFatal, enabled = true } = {},
) {
  const key = JSON.stringify(filters || {});
  const [pageState, setPageState] = useState({ key, page: 0 });
  // a filter change shows page 0 right away (no extra request for the old page number)
  const page = pageState.key === key ? pageState.page : 0;

  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);

  const fetcherRef = useRef(fetcher);
  const filtersRef = useRef(filters);
  const onFatalRef = useRef(onFatal);
  useEffect(() => {
    fetcherRef.current = fetcher;
    filtersRef.current = filters;
    onFatalRef.current = onFatal;
  });

  useEffect(() => {
    if (!enabled) return undefined;
    let off = false;
    setLoading(true);
    setError(null);
    fetcherRef
      .current({ ...(filtersRef.current || {}), page, size })
      .then((res) => {
        if (off) return;
        const d = res.data || {};
        setData({
          items: Array.isArray(d.items) ? d.items : [],
          totalPages: Number(d.totalPages) || 0,
          totalElements: Number(d.totalElements) || 0,
        });
      })
      .catch((e) => {
        if (off) return;
        const info = noteTrackerGenericErrorInfo(e);
        setData(EMPTY);
        if (isFatalError(info) || extendedKind(info) === "workflowsDisabled") {
          onFatalRef.current?.(info);
        } else {
          setError(info);
        }
      })
      .finally(() => {
        if (!off) setLoading(false);
      });
    return () => {
      off = true;
    };
  }, [key, page, size, tick, enabled]);

  // the last item of a page was deleted -> step back one page
  useEffect(() => {
    if (!loading && !error && data.items.length === 0 && page > 0) {
      const last = Math.max(0, data.totalPages - 1);
      setPageState({ key, page: Math.min(page - 1, last) });
    }
  }, [loading, error, data, page, key]);

  const setPage = useCallback(
    (p) => setPageState({ key, page: Math.max(0, p) }),
    [key],
  );
  const reload = useCallback(() => setTick((n) => n + 1), []);
  const replaceItem = useCallback(
    (updated) =>
      setData((d) => ({
        ...d,
        items: d.items.map((i) => (i.id === updated.id ? updated : i)),
      })),
    [],
  );

  return {
    items: data.items,
    page,
    setPage,
    totalPages: data.totalPages,
    totalElements: data.totalElements,
    loading,
    error,
    reload,
    replaceItem,
  };
}
