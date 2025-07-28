<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class category extends Model
{
    use HasFactory;

    public function sub_category()
    {
        return $this->hasMany(SubCategory::class);
    }

    public function product()
    {
        return $this->hasMany(Product::class);
    }

    public static function getLists ($search)
    {
        return $search;
    }

    public static function getList($search)
    {
         try {
            $obj = new self;
            $categoryArr = array();
            $pagination = (isset($search['perpage'])) ? $search['perpage'] : config('constant.pagination');
            if (isset($search['name']) && !empty($search['name'])) {
                $obj = $obj->where('name', 'like', '%' . trim($search['name']) . '%');
                $cat = Category::where('name', 'like', '%' . trim($search['name']) . '%')->get();
                if (count($cat)) {
                    foreach ($cat as $cat_data) {
                        array_push($categoryArr, $cat_data->id);
                    }
                }

            }
            if (isset($search['is_featured']) && $search['is_featured'] != '') {
                $obj = $obj->where('is_featured', $search['is_featured']);
            }
            if (isset($search['status']) && $search['status'] != '') {
                $obj = $obj->where('status', $search['status']);
            }
            if (isset($categoryArr) && count($categoryArr)) {
                $obj = $obj->orWhereIn('parent_id', $categoryArr);
            }
            // echo json_encode($obj);exit;
            $data = $obj->with('main_category')->paginate($pagination)->appends('perpage', $pagination);
            // latest('created_at')->
            if (count($data)) {
                foreach ($data as $row) {
                    $row->product_count = Product::where('category_id', $row->id)->count();
                }
            }
            return $data;
        } catch (\Exception $e) {
            return ['status' => false, 'message' => $e->getMessage() . ' ' . $e->getLine() . ' ' . $e->getFile()];
        }
    }
}
