<?php

namespace App\Services;

use Illuminate\Support\Collection;

class FuzzySearch
{
    public function search(string $query, string $modelClass, array $columns, int $threshold = 3): Collection
    {
        $query = strtolower(trim($query));
        $model = new $modelClass;
        
        return $model::all()
            ->map(function ($item) use ($query, $columns, $threshold) {
                $minDistance = null;
                
                foreach ($columns as $column) {
                    $value = strtolower(trim($item->{$column} ?? ''));
                    $distance = levenshtein_distance($query, $value);
                    
                    if ($minDistance === null || $distance < $minDistance) {
                        $minDistance = $distance;
                    }
                }
                
                return [
                    'item' => $item,
                    'distance' => $minDistance
                ];
            })
            ->filter(function ($result) use ($threshold) {
                return $result['distance'] <= $threshold;
            })
            ->sortBy('distance')
            ->pluck('item');
    }
}